<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  import { Alert } from "../store/Alert.js";
  import { Auth } from "../store/Auth.js";
  import BlogModal from "./BlogModal.svelte";

  export let id;
  let showModal = false;
  $: blog = {};
  $: createdBy = {};

  onMount(async () => {
    try {
      const resp = await fetch(`http://localhost:3000/blog/${id}`);
      const res = await resp.json();
      if (res.message) {
        Alert.setValues("ERROR", res.message);
        navigate("/home", { replace: true });
        return;
      }
      blog = res;
      createdBy = { ...blog.createdBy };
    } catch (err) {
      throw err;
    }
  });

  const handleDelete = async _id => {
    const resp = await fetch(`http://localhost:3000/blog/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${$Auth.token}`,
        "Content-Type": "application/json"
      }
    });
    const res = await resp.json();
    Alert.setValues("SUCCESS", "Blog deleted");
    navigate("/home", { replace: true });
    return;
  };

  const updateBlog = () => {
    showModal = true;
  };

  const hideBlogModal = () => {
    showModal = false;
  };
</script>

<style>
  .card {
    width: 80%;
    min-height: 100px;
    margin: auto auto;
    background-color: #e6e1e133;
    padding: 10px;
    border-radius: 20px;
    border: 3px solid #ccc;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  .card h1 {
    margin-bottom: 20px;
    text-align: center;
    color: #808080;
    font-weight: bolder;
  }

  .card p {
    font-size: 20px;
    font-weight: lighter;
    color: #ff7700;
  }

  .button-area {
    margin-top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .button-area button {
    margin-right: 10px;
    padding: 15px 30px;
    background-color: none;
    border: none;
    outline: none;
    font-weight: bold;
    font-size: 16px;
    border-radius: 20px;
    transition: all 0.3s ease-in;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .button-area button:hover {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    transform: translateY(-2px);
  }

  .button-area button:active {
    transform: translateY(3px);
  }

  .update {
    background-image: linear-gradient(to left, #00d0ff, #3ab5c2);
  }

  .delete {
    background-image: linear-gradient(to left, #ff0000bd, #0000ff99);
  }
</style>

{#if showModal}
  <BlogModal
    on:hideBlogModal={hideBlogModal}
    description={blog.description}
    id={blog._id} />
{/if}
{#if blog}
  <div class="card">
    <h1>Created By: {createdBy.name}</h1>
    <p>{blog.description}</p>
    {#if $Auth.isAuth && $Auth._id == createdBy._id}
      <div class="button-area">
        <button class="update" on:click={updateBlog}>Update</button>
        <button class="delete" on:click={e => handleDelete(blog._id)}>
          Delete
        </button>
      </div>
    {/if}
  </div>
{/if}
