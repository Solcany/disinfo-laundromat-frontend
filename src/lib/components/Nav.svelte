<script lang="ts">
  import { UI_NAV } from '$config';
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
    {#each UI_NAV as { label, path }}
      <li class="px-3 first:pl-0 last:px-0 last:pl-3">
        <a
          class="font-sans text-white {activePath === getPathRoot(path)
            ? 'font-bold'
            : 'font-base '}"
          href={path}>{label}</a
        >
      </li>
    {/each}
  </ul>
</nav>
