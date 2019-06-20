<script>
  import { Link, Router } from "svelte-routing";
  import { Auth } from "../store/Auth.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const addBlog = () => {
    dispatch("showBlogModal");
  };

  const logout = () => {
    Auth.logout();
  };
</script>

<style>
  nav {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid #d5d5d5;
    background-color: #00e7ff47;
  }
  .logo {
    padding-left: 20px;
    font-size: 30px;
    font-weight: bolder;
    color: red;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }
  .list {
    padding-right: 20px;
  }

  .list ul {
    list-style-type: none;
    display: flex;
  }

  .list ul li {
    padding: 0 4px;
  }

  .link {
    font-size: 20px;
    margin-right: 10px;
  }

  .link button {
    font-size: inherit;
    border: none;
    background: none;
    cursor: pointer;
    color: #5518ab;
    text-decoration: underline;
  }
</style>

<nav>
  <div class="logo">
    <h1>Svelte</h1>
  </div>
  <div class="list">
    <ul>
      <Router>
        {#if $Auth.isAuth}
          <li class="link">
            <Link to="/home">Home</Link>
          </li>
          <li class="link">
            <button on:click={addBlog}>Add Blog</button>
          </li>
          <li class="link">
            <button on:click={logout}>Logout</button>
          </li>
        {:else}
          <li class="link">
            <Link to="/register">Register</Link>
          </li>
          <li class="link">
            <Link to="/login">Login</Link>
          </li>
        {/if}
      </Router>
    </ul>
  </div>
</nav>
