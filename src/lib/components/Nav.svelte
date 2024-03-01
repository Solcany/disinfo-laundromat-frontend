<script lang="ts">
  import {UI_NAV} from '$config';
  import { onMount } from 'svelte';
  import { cn, getPathRoot } from '$utils'; 
  import { page } from '$app/stores';
  let className: string | undefined = undefined;
  export { className as class };

  let activePath: string = getPathRoot($page.route.id || '');

  $: {
    activePath = getPathRoot($page.route.id || '');
  }
  </script>

<nav class={cn('', className)}>
  <ul class="flex list-none">
  {#each UI_NAV as {label, path}}
    <li class="px-3"><a class="sans text-white px-3 text-base {activePath === getPathRoot(path) ? 'font-bold' : ''}" href={path}>{label}</a></li>
  {/each}
  </ul>
</nav>

