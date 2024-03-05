<script lang="ts">
  import type { TableRowData } from '$models';
  import { cn } from '$utils';
  import Tooltip from '$components/Tooltip.svelte';

  export let data: TableRowData;
  let className: string = '';
  export { className as class };

  let domainAssociations = (
    data.hasOwnProperty('domainAssociations') ? data.domainAssociations : []
  ) as string[];
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
        <td class="border-b-2 border-gray3 text-sm text-black dark:text-white">
          {value}
          {#each domainAssociations as association}
            <Tooltip>
              <svelte:fragment slot="icon">i</svelte:fragment>
              <svelte:fragment slot="content">{association}</svelte:fragment>
            </Tooltip>
          {/each}
        </td>
      {:else}
        <td class="border-b-2 border-gray3 py-4 text-sm text-black dark:text-white">
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
          <span
            class="inline-block shrink-0 rotate-90 font-sans text-xl text-black dark:text-white"
          >
            &gt;
          </span>
        {:else}
          <span
            class="inline-block shrink-0 rotate-[-90deg] font-sans text-base text-xl text-black dark:text-white"
            >&gt;</span
          >
        {/if}
      </button>
    </td><td> </td></tr
  >
  <!-- expanded row Table -->
  {#if isExpanded && data.dataComplementary.length > 0}
    <tr>
      <td colSpan={data.data.length + 1}>
        <div class="w-full bg-white py-4 dark:bg-gray6">
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
