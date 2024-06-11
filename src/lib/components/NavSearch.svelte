<script lang="ts">
  import { page } from '$app/stores';
  import { SEARCH_NAV } from '$config';

  let activePath: string | null = $page.route.id;
  $: {
    activePath = $page.route.id;
  }
</script>

<nav class="z-50 grid w-full grid-cols-1 border-t-[1px] border-gray5 md:grid-cols-12">
  <ul class="col-span-3 flex w-full">
    {#each SEARCH_NAV as { label, path }}
      <li
        class="{activePath === path ? 'dark:bg-gray7' : 'border-b-[1px]'} 
          flex flex-1 justify-center border-r-[1px] border-gray5 py-2"
      >
        <a
          class="text-center text-sm font-light text-black md:text-base dark:text-white"
          href={path}>{label}</a
        >
      </li>
    {/each}
  </ul>
</nav>
