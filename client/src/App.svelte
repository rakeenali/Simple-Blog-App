<script>
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-routing";
  import { Alert } from "./store/Alert.js";
  import { Auth } from "./store/Auth.js";

  import Login from "./components/Login.svelte";
  import Register from "./components/Register.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Message from "./components/Message.svelte";
  import BlogModel from "./components/BlogModal.svelte";
  import Home from "./components/Home.svelte";
  import SingleBlog from "./components/SingleBlog.svelte";
  import Footer from "./components/Footer.svelte";

  let showModal = false;

  onMount(() => {
    if (localStorage.getItem("svelte-app")) {
      const token = localStorage.getItem("svelte-app");
      Auth.setToken(token);
    }
  });

  const showBlogModal = () => {
    showModal = true;
  };

  const hideBlogModal = () => {
    showModal = false;
  };
</script>

<style>
  .container {
    margin-top: 90px;
    margin-bottom: 70px;
  }
</style>

<Navbar on:showBlogModal={showBlogModal} />
{#if showModal}
  <BlogModel on:hideBlogModal={hideBlogModal} />
{/if}
<div class="container">
  {#if $Alert.show}
    <Message />
  {/if}
  <!-- <div>{$Auth.isAuth}</div> -->
  <Router>
    <div>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
      <Route path="/blog/:id" component={SingleBlog} />
    </div>
  </Router>
</div>
<Footer />
