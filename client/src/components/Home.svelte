<script>
  import { onMount } from "svelte";
  import { link, navigate } from "svelte-routing";

  import { Auth } from "../store/Auth.js";
  import { Alert } from "../store/Alert.js";

  let getBlogs = [];
  $: blogs = getBlogs;

  onMount(async () => {
    const resp = await fetch("http://localhost:3000/blog/all");
    const res = await resp.json();
    getBlogs = [...getBlogs, ...res];
  });
</script>

<style>
  .container {
    /* min-width: 100%; */
    /* min-height: 100%; */
    margin: 0 auto;
  }

  .card {
    background-image: linear-gradient(to right bottom, #fcfcfc, #0d000073);
    width: 60%;
    min-height: 100px;
    height: auto;
    margin: 10px auto;
    padding: 5px;
    border: 3px solid #eadfdf;
  }

  .card h3 {
    text-align: center;
    margin-bottom: 15px;
    color: #ff00af;
    font-weight: bolder;
  }

  .card p {
    font-size: 20px;
    font-weight: lighter;
    color: #ff00007d;
  }

  .button-area {
    margin-top: 20px;
    width: 100%;
  }
  .button-area a {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    text-decoration: none;
    color: #1100fe;
    cursor: pointer;
    transition: all 0.3s;
  }

  .button-area a:hover {
    font-weight: bold;
    transform: scale(1.01);
  }
</style>

<div class="container">
  {#each blogs as blog}
    <div class="card">
      <h3>Created By: {blog.createdBy.name}</h3>
      <p>{blog.description}</p>
      <div class="button-area">
        <a href={`/blog/${blog._id}`} use:link>Details →</a>
      </div>
    </div>
  {/each}
</div>
