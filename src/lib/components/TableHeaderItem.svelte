<script lang="ts">
  import { ArrowUp, ArrowDown } from 'phosphor-svelte';
  import {  type TableHeaderItemData, TableHeaderItemType,  SortDirection } from '$models';
  import { cn } from '$utils';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';
  export let data: TableHeaderItemData;
  export let sortStatus: SortDirection;
  export let onClick: () => void;
  let className: string | undefined = undefined;
  export { className as class };
</script>


{#if data.type === TableHeaderItemType.Empty}
  <th class={cn('', className)} role="columnheader" scope="col"/>
{:else}
<th class={cn('', className)} role="columnheader" scope="col">
  <div class="flex items-center py-2 px-4 font-sans text-lg font-light text-black dark:text-white ">
    {data.label}
    <button
      aria-label="sort by column"
      on:click={onClick}
      class="shrink-0 pl-1 pr-2 font-sans text-xl font-normal"
    >
      {#if sortStatus === SortDirection.Ascending}
        <span class="font-sans text-black dark:text-white">
          <ArrowUp class="fill-black dark:fill-white" weight="bold" size={20} />
        </span>
      {:else if sortStatus === SortDirection.Descending}
        <ArrowDown class="fill-black dark:fill-white" weight="bold" size={20} />
      {:else}
        <ArrowUp class="fill-gray1" size={20} />
      {/if}
    </button>
    {#if data.tooltip}
      <Tooltip>
        <svelte:fragment slot="icon">i</svelte:fragment>
        <svelte:fragment slot="content">data.tooltip</svelte:fragment>
      </Tooltip>
    {/if}
  </div>
</th>
{/if}
