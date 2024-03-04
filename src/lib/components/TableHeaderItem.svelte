<script lang="ts">
  import type { TableHeaderItemData } from '$models';
  import { cn } from '$utils';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';
  export let data : TableHeaderItemData;
  export let onClick: () => void;
  let className: string | undefined = undefined;
  export {className as class};
</script>

<th class={cn('', className)} role="columnheader" scope="col">
  <div class="pr-4 flex items-center font-sans font-normal dark:text-white text-black text-sm">
  {data.label}
  <button on:click={onClick} class="pl-1 pr-2 font-sans font-normal text-xl shrink-0">
    <span class="font-sans dark:text-white">↑</span>
  </button>
   {#if data.tooltip}
      <Tooltip>
        <span slot="icon">i</span>
        <svelte:fragment slot="content">data.tooltip</svelte:fragment>
      </Tooltip>
   {/if}
   </div>
</th>
