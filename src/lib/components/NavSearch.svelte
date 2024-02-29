<script lang="ts">
  import { page } from '$app/stores';
  import {UI_SEARCH_NAV} from '$config';

  let activePath: string | null = $page.route.id;
  $: {
    activePath = $page.route.id;
  }
</script>

<nav class="outline outline-1">
  <ul class="flex w-full">
  {#each UI_SEARCH_NAV as {label, path}}
    <li class="px-3 {activePath === path ? 'bg-red-500' : ''}"><a href={path}>{label}</a></li>
  {/each}
  </ul>
</nav>


