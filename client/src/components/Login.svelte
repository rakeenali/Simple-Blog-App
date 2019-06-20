<script>
  import { onMount } from "svelte";
  import { Alert } from "../store/Alert.js";
  import { Auth } from "../store/Auth.js";
  import { navigate } from "svelte-routing";

  let email = "";
  let password = "";
  let errors = {};

  const checkError = () => {
    if (email.trim() === "") {
      errors.email = "Email is required";
      return true;
    }
    if (password.trim() === "") {
      errors.password = "Password is required";
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    const error = checkError();
    if (error) return;

    const data = { email, password };
    try {
      const resp = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const res = await resp.json();

      if (res.message) {
        Alert.setValues("ERROR", "Invalid email or password");
        return;
      }
      Auth.setToken(res.token);
      navigate("/home", { replace: true });
    } catch (err) {
      throw err;
    }
  };
</script>

<style>
  .container {
    width: 40%;
    height: 50%;
    margin: 0 auto;
    background-color: #d0d0d04a;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  }

  .container h1 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 40px;
    font-weight: bold;
  }

  .container hr {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  .form div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .form div label {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .form div input {
    padding: 10px;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    width: 70%;
    margin: 0 auto;
    transform: all 0.4s ease-in;
  }

  .form div input:active,
  .form div input:focus {
    width: 96%;
  }

  .form div code {
    color: red;
    text-align: center;
    margin-top: 10px;
    font-size: 20px;
  }

  .form div button {
    width: 70%;
    margin: 0 auto;
    margin-top: 20px;
    padding: 10px 10px;
    font-size: 20px;
    outline: none;
    background-color: #fff;
    border-radius: 10px;
    transition: all 0.4s ease-out;
  }

  .form div button:hover {
    transform: translateY(-1px);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
  }

  .form div button:active {
    transform: translateY(1px);
  }
</style>

<div class="container">
  <h1>Login</h1>
  <hr />
  <form class="form" on:submit|preventDefault={handleSubmit}>
    <div>
      <label>Your Email</label>
      <input
        type="text"
        placeholder="Email"
        autocomplete="name"
        bind:value={email} />
      {#if errors.email}
        <code>{errors.email}</code>
      {/if}
    </div>
    <div>
      <label>Your Password</label>
      <input
        type="password"
        placeholder="Password"
        autocomplete="current-password"
        bind:value={password} />
      {#if errors.password}
        <code>{errors.password}</code>
      {/if}
    </div>
    <div>
      <button type="submit">Login</button>
    </div>
  </form>
</div>
