import { writable } from "svelte/store";

function alert() {
  const { subscribe, set, update } = writable({
    type: "",
    message: "",
    show: false
  });

  const setValues = (type, message) => {
    return update(state => ({
      ...state,
      type,
      message,
      show: true
    }));
  };

  const logValues = () => {
    const unsubscribe = subscribe(value => {
      return console.log(value);
    });
  };

  return {
    subscribe,
    setValues,
    logValues,
    reset: () =>
      set({
        type: "",
        message: "",
        show: false
      })
  };
}

export const Alert = alert();
