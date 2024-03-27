
<script lang="ts">
  import { CaretDown, CaretUp } from 'phosphor-svelte';
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

<tr class="w-full">
  <!-- the domain colmn -->
  <td class="border-b-2 border-gray3 text-sm text-black dark:text-white">
    {#if data.domain}
      <a href={domainToUrl(data.domain)} class="underline">{data.domain}</a>
      {#if data.source && data.source.length > 0}
        {#each data.source as source}
          <Tooltip>
            <svelte:fragment slot="icon">i</svelte:fragment>
            <svelte:fragment slot="content">{source}</svelte:fragment>
          </Tooltip>
        {/each}
      {/if}
    {/if}
  </td>

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
  {#if isExpanded}
    <tr>
      <td colSpan={}>
        <div class="w-full bg-white py-4 dark:bg-gray7">
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
