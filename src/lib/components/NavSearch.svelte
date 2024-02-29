<script lang="ts">
  import { page } from '$app/stores';
  import {UI_SEARCH_NAV} from '$config';
  function isActive(path: string) {
    return $page.route.id === path;
  }
</script>

<nav class="outline outline-1">
  <ul class="flex w-full">
  {#each UI_SEARCH_NAV as {label, path}}
    <li class="px-3 {isActive(path) ? 'bg-red-500' : ''}"><a href={path}>{label}</a></li>
  {/each}
  </ul>
</nav>
<slot />
