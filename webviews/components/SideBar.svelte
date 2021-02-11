<script lang="ts">
  let todos: Array<{ text: string; completed: boolean }> = [];
  let text = "";
</script>

<form
  action=""
  on:submit|preventDefault={() => {
    todos = [{ text, completed: false }, ...todos];
    text = "";
  }}
>
  <input type="text" bind:value={text} />
</form>

<ul>
  {#each todos as todo (todo.text)}
    <li
      class:completed={todo.completed}
      on:click={() => {
        todo.completed = !todo.completed;
      }}
    >
      {todo.text}
    </li>
  {/each}
</ul>

<style>
  .completed {
    text-decoration: line-through;
  }
</style>
