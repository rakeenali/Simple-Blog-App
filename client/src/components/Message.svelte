<script>
  import { Alert } from "../store/Alert.js";
  import { afterUpdate } from "svelte";

  let error = false;
  let success = false;

  if ($Alert.type === "ERROR") {
    error = true;
    success = false;
  } else if ($Alert.type === "SUCCESS") {
    success = true;
    error = false;
  }

  afterUpdate(() => {
    setTimeout(() => {
      Alert.reset();
    }, 3000);
  });

  const closeError = () => {
    Alert.reset();
  };
</script>

<style>
  .container {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    padding: 10px 0;
    border-radius: 20px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }
  .error {
    background-color: #ff0000d9;
  }

  .success {
    background-color: #00ff6e;
  }

  .container h3 {
    padding-left: 5px;
  }

  .container span {
    padding-right: 5px;
    font-size: 30px;
    align-self: center;
    cursor: pointer;
  }
  .container span:hover {
    font-weight: bolder;
  }
</style>

<div class="container" class:error class:success>
  <h3>{$Alert.message}</h3>
  <span on:click={closeError}>×</span>
</div>
