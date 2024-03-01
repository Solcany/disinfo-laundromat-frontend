<script lang="ts">
  import { page } from '$app/stores';
  import {UI_SEARCH_NAV} from '$config';

  let activePath: string | null = $page.route.id;
  $: {
    activePath = $page.route.id;
  }
</script>

<nav>
  <ul class="flex w-full">
  {#each UI_SEARCH_NAV as {label, path}}
    <li class="{activePath === path ? 'dark:text-white dark:bg-gray4' : 'dark:text-white'} font-light px-8 py-2 dark:border-r-2 dark:border-gray3"><a href={path}>{label}</a></li>
  {/each}
  </ul>
</nav>


