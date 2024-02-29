<script lang="ts">
  import {UI_NAV} from '$config';
  import { cn } from '$utils'; 
  import { page } from '$app/stores';
  let className: string | undefined = undefined;
  export { className as class };
  function isActive(path: string) {
    return $page.route.id === path;
  }
</script>

<nav class={cn('', className)}>
  <ul class="flex list-none">
  {#each UI_NAV as {label, path}}
    <li class="px-3 {isActive(path) ? 'bg-red-500' : ''}"><a href={path}>{label}</a></li>
  {/each}
  </ul>
</nav>

