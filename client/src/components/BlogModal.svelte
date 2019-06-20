<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { Auth } from "../store/Auth.js";
  import { navigate } from "svelte-routing";

  const dispatch = createEventDispatcher();

  export let description = "";
  export let id = "";

  let errors = {};
  let isNew = true;

  onMount(() => {
    if (description.trim() !== "") {
      isNew = false;
    }
  });

  const submitBlog = async () => {
    if (description.trim() === "") {
      errors.description = "Description field must no be empty";
      return;
    }

    try {
      const data = { description };

      if (isNew) {
        const resp = await fetch("http://localhost:3000/blog/create", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${$Auth.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        const res = await resp.json();

        if (res) {
          window.location.reload();
        }
      } else {
        const resp = await fetch(`http://localhost:3000/blog/update/${id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${$Auth.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        const res = await resp.json();
        if (res) {
          window.location.reload();
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const hideBlog = () => {
    dispatch("hideBlogModal");
  };
</script>

<style>
  .container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 55%;
    height: 50%;
    margin: 0 auto;
    background-color: #ccbecb38;
    border: 1px solid rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .container header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-content: center;
    padding: 4px 10px;
    border-bottom: 3px solid rgba(0, 0, 0, 0.3);
    background-color: #fff;
  }

  .container header button {
    outline: none;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease-in;
  }

  .container header button:hover {
    transform: translateY(1px);
    font-weight: bold;
  }

  .container form {
    width: 100%;
    height: 100%;
  }

  .form-area {
    width: 100%;
    height: 78%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .form-area label {
    text-align: center;
    font-size: 30px;
  }

  .form-area textarea {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    font-size: 20px;
  }

  .form-area code {
    font-size: 17px;
    margin: 3px 0;
    color: red;
    text-align: center;
  }

  .button-area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .button-area button {
    padding: 10px 15px;
    outline: none;
    background: none;
    border: none;
    transition: all 0.3s;
    cursor: pointer;
  }
  .button-area button:hover {
    transform: scale(1.03);
  }

  .button-area .submit {
    background-color: #ff5e00;
  }

  .button-area .close {
    background-color: red;
  }
</style>

<div class="container">
  <header>
    <h1>Add a blog</h1>
    <button on:click={hideBlog}>×</button>
  </header>
  <form on:submit|preventDefault={submitBlog}>
    <div class="form-area">
      <label>Blog description</label>
      <textarea bind:value={description} />
      {#if errors.description}
        <code>{errors.description}</code>
      {/if}
    </div>
    <div class="button-area">
      <button type="submit" class="submit">Publish</button>
      <button class="close" on:click={hideBlog}>Close</button>
    </div>
  </form>
</div>
