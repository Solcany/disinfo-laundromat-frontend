<script lang="ts">
  import { page } from '$app/stores';
  import { UI_SEARCH_NAV } from '$config';

  let activePath: string | null = $page.route.id;
  $: {
    activePath = $page.route.id;
  }
</script>

<!--
data-[state=active]:shadow-mini h-10 flex-1 border-b-[1px] border-r-[1px] border-gray5 py-2 last:border-r-0 data-[state=active]:border-b-0 data-[state=active]:bg-gray7 dark:bg-gray6 dark:text-gray2 data-[state=active]:dark:text-white
-->
<nav class="z-50 grid w-full grid-cols-1 md:grid-cols-12 border-t-[1px] border-gray5">
  <ul class="col-span-3 flex w-full">
    {#each UI_SEARCH_NAV as { label, path }}
      <li
        class="{activePath === path
          ? 'dark:bg-gray7 dark:text-white'
          : 'border-b-[1px] dark:text-white'} 
          flex flex-1 justify-center border-r-[1px] border-gray5 py-2 font-light "
      >
        <a href={path}>{label}</a>
      </li>
    {/each}
  </ul>
</nav>
