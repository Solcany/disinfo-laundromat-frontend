<script lang="ts">
  import type { Writable } from 'svelte/store'; 
  import Button from '$components/Button.svelte';
  export let formDataStore: Writable<FormData>;
  export let formData: FormData;
  export let onButtonClick: (() => void) | undefined = undefined;

  function handleClick() {
    formDataStore.set(formData);
    if(onButtonClick) onButtonClick();
  }
</script>

<div>
  <Button ariaLabel="Set form data" on:click={handleClick}> Try Search </Button>
</div>


