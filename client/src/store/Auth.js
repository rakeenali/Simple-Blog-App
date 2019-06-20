import { writable } from "svelte/store";
import { navigate } from "svelte-routing";
import jwtDecode from "jwt-decode";

function auth() {
  const { subscribe, set, update } = writable({
    token: "",
    name: "",
    _id: "",
    isAuth: false
  });

  const logValues = () => {
    const unsubscribe = subscribe(value => {
      return console.log(value);
    });
  };

  const setToken = token => {
    const decode = jwtDecode(token);
    localStorage.setItem("svelte-app", token);
    return update(n => ({
      ...n,
      token,
      name: decode.name,
      _id: decode._id,
      isAuth: true
    }));
  };

  const logout = () => {
    localStorage.removeItem("svelte-app");
    navigate("/login", { replace: true });

    return update(n => ({
      token: "",
      name: "",
      _id: "",
      isAuth: false
    }));
  };

  return {
    subscribe,
    logValues,
    setToken,
    logout
  };
}

export const Auth = auth();
