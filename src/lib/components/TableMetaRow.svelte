<script lang="ts">
  import { CaretDown, CaretUp } from 'phosphor-svelte';
  import type { TableMetaRowData } from '$models';
  import { cn } from '$utils';
  import Tooltip from '$components/Tooltip.svelte';

  export let data: TableMetaRowData;
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
      {#if data.domain}
        <td class="border-b-2 border-gray3 text-sm text-black dark:text-white">
          <a href={"https://" + data.domain}>{data.domain}</a>
          {#if data.domainAssociations && data.domainAssociations.length > 0}
          {#each domainAssociations as association}
            <Tooltip>
              <svelte:fragment slot="icon">i</svelte:fragment>
              <svelte:fragment slot="content">{association}</svelte:fragment>
            </Tooltip>
          {/each}
          {/if}
        </td>
      {/if}

<!--
      {:else}
        <td class="border-b-2 border-gray3 py-4 text-sm text-black dark:text-white">
          <div class="w-0 min-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {value}
          </div>
        </td>
      {/if}
      -->
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
    </td>
    <td></td>
  <!-- expanded row Table -->
  {#if isExpanded && data.indicators && data.indicators.length > 0}
    <tr>
      {#each data.indicators as d}
      {@const tier = d.tier}

      <td colSpan={4}>
        <div class="w-full bg-white py-4 dark:bg-gray6">

        {#if tier === 1}
          tier1
        {:else if tier === 2}
          tier2
        {:else} 
          tier3
        {/if}

        <!--
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
          -->
        </div>
      </td>
      {/each}
    </tr>
  {/if}
</tr>

