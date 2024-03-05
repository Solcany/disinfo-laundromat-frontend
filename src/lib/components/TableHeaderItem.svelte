<script lang="ts">
  import { type TableHeaderItemData, SortDirection } from '$models';
  import { cn } from '$utils';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';
  export let data : TableHeaderItemData;
  export let sortStatus: SortDirection;
  export let onClick: () => void;
  let className: string | undefined = undefined;
  export {className as class};
</script>

<th class={cn('', className)} role="columnheader" scope="col">
  <div class="pr-4 flex items-center font-sans font-light dark:text-white text-black text-lg">
  {data.label}
  <button aria-label="sort by column" on:click={onClick} class="pl-1 pr-2 font-sans font-normal text-xl shrink-0">
    {#if sortStatus === SortDirection.Ascending}
      <span class="font-sans dark:text-white text-black">↑</span>
    {:else if sortStatus === SortDirection.Descending}
      <span class="font-sans dark:text-white text-black inline-block rotate-180">↑</span>
    {:else}
      <span class="font-sans dark:text-gray1">↑</span>
    {/if}
  </button>
   {#if data.tooltip}
      <Tooltip>
        <span slot="icon">i</span>
        <svelte:fragment slot="content">data.tooltip</svelte:fragment>
      </Tooltip>
   {/if}
   </div>
</th>
