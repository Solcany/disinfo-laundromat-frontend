<script lang="ts">
  import type { TableRowData } from '$models';
  import { cn } from '$utils';
  import Tooltip from '$components/Tooltip.svelte';

  export let data: TableRowData;
  let className: string = '';
  export {className as class};

  let domainAssociations = (data.hasOwnProperty('domainAssociations') ? data.domainAssociations : []) as string[];
  let isExpanded = false;
  
  function handleClick() {
    isExpanded = !isExpanded;
  }
</script>
{#if data.data.length > 0}
  <tr class="w-full">
      <!-- row data -->
      {#each data.data as [key, value]}
        {#if key === 'domain' && domainAssociations.length > 0} 
          <td class="dark:text-white text-black text-sm border-b-2 border-gray3">
            {value}
            {#each domainAssociations as association}
              <Tooltip>
                <svelte:fragment slot="icon">i</svelte:fragment>
                <svelte:fragment slot="content">{association}</svelte:fragment>
              </Tooltip>
            {/each}
          </td>
        {:else}
          <td class="py-4 dark:text-white text-black text-sm border-b-2 border-gray3">
            <div class="w-0 min-w-full whitespace-nowrap text-ellipsis overflow-hidden">
            {value}
            </div>
          </td>
        {/if}
      {/each}
      <!-- expand row button -->

      <td class="align-middle">
        <button on:click={handleClick}
                aria-label="expand row"
                class="px-3 flex items-center align-center">
        {#if isExpanded}
          <span class="rotate-90 shrink-0 font-sans text-xl dark:text-white text-black inline-block"> &gt; </span>
        {:else}
          <span class="rotate-[-90deg] shrink-0 text-xl font-sans text-base dark:text-white text-black inline-block">&gt;</span>
        {/if}
        </button>
      <td>
    
  </tr>
  <!-- expanded row data -->
  {#if isExpanded && data.dataComplementary.length > 0}
    <tr>
      <td colSpan={data.data.length}>
        <table class="w-full bg-blue-100">
          <tbody>
            {#each data.dataComplementary as [key, value]}
              <tr>
                <th>
                  {key}
                </th>
              </tr>
              <tr>
                <td>
                  {key}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </td>
    </tr>
  {/if}
{/if}
