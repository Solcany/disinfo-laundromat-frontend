<script lang="ts">
  import { CaretDown, CaretUp } from 'phosphor-svelte';
  import type { TableContentRowData } from '$models';
  import { cn } from '$utils';
  import Tooltip from '$components/Tooltip.svelte';

  export let data: TableContentRowData;
  let className: string = '';
  export { className as class };

  let tags = (
    data.hasOwnProperty('tags') ? data.tags : []
  ) as string[];

  let isExpanded = false;

  function handleClick() {
    isExpanded = !isExpanded;
  }
</script>

{#if data.dataMain.length > 0}
<tr
  on:click={handleClick}
  aria-label="click to expand row"
  class="w-full border-gray3 hover:bg-black {isExpanded
    ? 'border-b-0 hover:cursor-n-resize'
    : 'border-b-[1px] hover:cursor-s-resize'}">
    <!-- row data -->
    {#each data.dataMain as [key, value]}
      {#if key === 'domain' && tags.length > 0}
      <td class="py-2 pl-4 text-sm text-black dark:text-white">
          {value}
          {#each tags as tag}
          <div class="inline-block mr-2">
            <Tooltip>
              <svelte:fragment slot="icon">i</svelte:fragment>
              <svelte:fragment slot="content">{tag}</svelte:fragment>
            </Tooltip>
          </div>
          {/each}
        </td>
      {:else if key === 'domain' && tags.length > 0}

      <!-- wip continue here. Render Score Bar chart --> 


      {:else}
      <td class="py-2 pl-4 text-sm text-black dark:text-white">
          <div class="w-0 min-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {value}
          </div>
        </td>
      {/if}
    {/each}
    <!-- expand row button -->

    <td class="align-middle">
      <button
        on:click={handleClick}
        aria-label="expand row"
        class="align-center flex items-center px-3"
      >
        {#if isExpanded}
          <span class="shrink-0">
            <CaretDown class="fill-black dark:fill-white" weight="bold" size={20} />
          </span>
        {:else}
          <span class="shrink-0"
            ><CaretUp class="fill-black dark:fill-white" weight="bold" size={20} /></span
          >
        {/if}
      </button>
    </td><td> </td></tr
  >
  <!-- expanded row Table -->
  {#if isExpanded && data.dataComplementary.length > 0}
  <tr class="border-b-[1px] border-gray3 bg-black">
      <td colSpan={data.dataMain.length + 1}>
        <div class="w-full py-4">
          <table>
            <tbody>
              {#each data.dataComplementary as [key, value]}
                <tr>
                  <th class="pl-4 text-left font-sans text-sm text-black dark:text-white">
                    {key}
                  </th>
                </tr>
                <tr>
                  <td class="pb-4 pl-4 font-sans text-sm text-black dark:text-white">
                    {value}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  {/if}
{/if}
