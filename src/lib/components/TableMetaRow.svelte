<script lang="ts">
  import { CaretDown, CaretUp } from 'phosphor-svelte';
  import type { TableMetaRowData } from '$models';
  import { cn } from '$utils';
  import Tooltip from '$components/Tooltip.svelte';
  import Rect from '$components/Rect.svelte';
  import RectMapped from '$components/RectMapped.svelte';
  import H3 from '$components/H3.svelte';
  import H4 from '$components/H4.svelte';

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
      <td class="border-b-2 border-gray3 text-sm text-black dark:text-white">     
      {#if data.domain}
          <a href={"https://" + data.domain}>{data.domain}</a>
          {#if data.domainAssociations && data.domainAssociations.length > 0}
          {#each domainAssociations as association}
            <Tooltip>
              <svelte:fragment slot="icon">i</svelte:fragment>
              <svelte:fragment slot="content">{association}</svelte:fragment>
            </Tooltip>
          {/each}
          {/if}
      {/if}      
      </td>
      <td class="border-b-2 border-gray3 text-sm text-black dark:text-white">  
      {#if data.indicators_summary}
      {@const rxy = 2}
      {@const h = 7}
      <div class="my-1">
        {#if data.indicators_summary.tier1}
          <div class="relative block">
            <Rect height_px={h} class="relative fill-gray6"rx={rxy} ry={rxy}/> 
            <RectMapped value={data.indicators_summary.tier1} value_max={10} rx={rxy} ry={rxy} height_px={h} class="absolute top-0 left-0 z-50 fill-indicator-1"/>
          </div>
        {:else}
        <div class="relative block">
          <Rect height_px={h} class="fill-gray6"rx={rxy} ry={rxy}/>
        </div>
        {/if}

        {#if data.indicators_summary.tier2}
          <div class="relative block my-1">
            <Rect height_px={h} class="relative fill-gray6"rx={rxy} ry={rxy}/> 
            <RectMapped value={data.indicators_summary.tier2} value_max={10} rx={rxy} ry={rxy} height_px={h} class="absolute top-0 left-0 z-50 fill-indicator-2"/>
          </div>
        {:else}
        <div class="relative block my-1">
          <Rect height_px={h} class="fill-gray6"rx={rxy} ry={rxy}/>
        </div>
        {/if}

        {#if data.indicators_summary.tier3}
          <div class="relative block">
            <Rect height_px={h} class="relative fill-gray6"rx={rxy} ry={rxy}/> 
            <RectMapped value={data.indicators_summary.tier3} value_max={10} rx={rxy} ry={rxy} height_px={h} class="absolute top-0 left-0 z-50 fill-indicator-3"/>
          </div>
        {:else}
        <div class="relative block">
          <Rect height_px={h} class="fill-gray6"rx={rxy} ry={rxy}/>
        </div>
        {/if}
      </div>
      {/if}
      </td>


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
  </tr>
  <!-- expanded row Table -->
  {#if isExpanded && data.indicators && data.indicators.length > 0}
    <tr>
      {#each data.indicators as entry}
      <td colSpan={2}>
        <div class="w-full bg-white py-4 dark:bg-gray6">

        {#if entry.tier}
          {#if entry.tier === 1}
            <div class="flex">
              <H3>Conclusive Metadata</H3>
            </div>
          {:else if entry.tier === 2}
            <div class="flex">
              <H3>Associative Metadata</H3>
            </div>
          {:else if entry.tier === 3} 
            <div class="flex">
              <H3>Tertiary Metadata</H3>
            </div>
          {/if}
        {/if} 

        {#if entry.data && entry.data.length > 0}
          {#each entry.data as indicator}
            {#if indicator.type}
              <H4>{indicator.type}</H4>
            {/if}
            {#if indicator.value && indicator.value.length > 0}
              <ul>
              {#each indicator.value as value}
                <li>{value}</li>
              {/each}
              </ul>
            {/if}
          {/each}
        {/if}
        </div>
      </td>
      {/each}
    </tr>
  {/if}

