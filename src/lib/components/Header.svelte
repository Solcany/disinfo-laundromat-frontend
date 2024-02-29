<script lang="ts">
  import { APP_TITLE } from '$config';
  import { cn } from '$utils';
  import Nav from '$components/Nav.svelte';
  import H1 from '$components/H1.svelte';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<header class={cn('w-100 px-2 md:px-3 py-1 flex justify-between', className)}>
  <H1><a href="/">{APP_TITLE}</a></H1>
  <Nav/>
</header>
