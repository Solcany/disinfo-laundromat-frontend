<script lang="ts">
  import { APP_TITLE } from '$config';
  import { cn } from '$utils';
  import H1 from '$components/H1.svelte';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<header class={cn('w-100 px-3 py-1 flex justify-between', className)}>
  <H1><a href="/">{APP_TITLE}</a></H1>
  <nav>
    <ul class="flex list-none">
      <li class="px-3"><a href="/search/url">Search</a></li>
      <li class="px-3"><a href=".">About</a></li>
      <li class="px-3"><a href=".">login</a></li>
      <ul></ul>
    </ul>
  </nav>
</header>
