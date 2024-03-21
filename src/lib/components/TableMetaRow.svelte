<script lang="ts">
  import { CaretDown, CaretUp } from 'phosphor-svelte';
  import type { TableMetaRowData, IndicatorMetadata } from '$models';
  import { cn, domainToUrl } from '$utils';
  import Tooltip from '$components/Tooltip.svelte';
  import Rect from '$components/Rect.svelte';
  import RectMapped from '$components/RectMapped.svelte';
  import H3 from '$components/H3.svelte';
  import H4 from '$components/H4.svelte';

  export let data: TableMetaRowData;
  export let metadata: IndicatorMetadata;  

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
  <!-- the domain column -->
  <td class="border-b-2 border-gray3 text-sm text-black dark:text-white">
    {#if data.domain}
      <a href={domainToUrl(data.domain)} class="underline">{data.domain}</a>
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

  <!-- the indicator sums column -->
  <td class="border-b-2 border-gray3 text-sm text-black dark:text-white">
    {#if data.indicators_summary}
      {@const rxy = 2}
      {@const h = 7}
      <div class="my-1">
        {#if data.indicators_summary.tier1}
          <div class="relative block">
            <Rect height_px={h} class="relative fill-gray6" rx={rxy} ry={rxy} />
            <RectMapped
              value={data.indicators_summary.tier1}
              value_max={10}
              rx={rxy}
              ry={rxy}
              height_px={h}
              class="absolute left-0 top-0 fill-indicator-1"
            />
          </div>
        {:else}
          <div class="relative block">
            <Rect height_px={h} class="fill-gray6" rx={rxy} ry={rxy} />
          </div>
        {/if}

        {#if data.indicators_summary.tier2}
          <div class="relative my-1 block">
            <Rect height_px={h} class="relative fill-gray6" rx={rxy} ry={rxy} />
            <RectMapped
              value={data.indicators_summary.tier2}
              value_max={10}
              rx={rxy}
              ry={rxy}
              height_px={h}
              class="absolute left-0 top-0 fill-indicator-2"
            />
          </div>
        {:else}
          <div class="relative my-1 block">
            <Rect height_px={h} class="fill-gray6" rx={rxy} ry={rxy} />
          </div>
        {/if}

        {#if data.indicators_summary.tier3}
          <div class="relative block">
            <Rect height_px={h} class="relative fill-gray6" rx={rxy} ry={rxy} />
            <RectMapped
              value={data.indicators_summary.tier3}
              value_max={10}
              rx={rxy}
              ry={rxy}
              height_px={h}
              class="absolute left-0 top-0 fill-indicator-3"
            />
          </div>
        {:else}
          <div class="relative block">
            <Rect height_px={h} class="fill-gray6" rx={rxy} ry={rxy} />
          </div>
        {/if}
      </div>
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
  </td>
  <td></td>
</tr>

<!-- expanded row -->
{#if isExpanded && data.indicators && data.indicators.length > 0}
  <tr class="border-b-2 border-gray3">
  <td colSpan={3}>
    {#each data.indicators as entry}
          {#if entry.tier}
            {#if entry.tier === 1}
              <div class="w-full block pl-3 py-4">
                <H3 class="block w-full dark:text-indicator-1 text-indicator-1">Conclusive Metadata</H3>
                {#if entry.data && entry.data.length > 0}
                <div class="pt-2 w-full grid grid-cols-3 gap-4">
                  {#each entry.data as indicator}
                    {#if indicator.type && 
                        indicator.value &&
                        indicator.value.length > 0}
                      <div>
                        <div class="block flex items-center">
                          <H4 class="pr-2">{indicator.type}</H4>
                          <Tooltip> 
                            <svelte:fragment slot="icon">i</svelte:fragment>
                            <svelte:fragment slot="content">{metadata[entry.tier + "-" + indicator.type].description}</svelte:fragment>
                          </Tooltip>
                        </div>
                        <ul>
                          {#each indicator.value as value}
                            <li class="text-sm dark:text-white text-black py-2">{value}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  {/each}
                </div>
                {/if}
              </div>
            {:else if entry.tier === 2}
              <div class="w-full pl-3 py-4">
                <H3 class="block w-full dark:text-indicator-2 text-indicator-2">Associative Metadata</H3>
                {#if entry.data && entry.data.length > 0}
                <div class="pt-2 w-full grid grid-cols-3 gap-4">
                  {#each entry.data as indicator}
                    {#if indicator.type && 
                        indicator.value &&
                        indicator.value.length > 0}
                      <div>
                        <H4 class="">{indicator.type}</H4>
                        <ul>
                          {#each indicator.value as value}
                            <li class="text-sm dark:text-white text-black py-2">{value}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  {/each}
                </div>
                {/if}
              </div>
            {:else if entry.tier === 3}
              <div class="w-full pl-3 py-4">
                <H3 class="block w-full dark:text-indicator-3 text-indicator-3">Tertiary Metadata</H3>
                {#if entry.data && entry.data.length > 0}
                <div class="pt-2 w-full grid grid-cols-3 gap-4">
                  {#each entry.data as indicator}
                    {#if indicator.type && 
                        indicator.value &&
                        indicator.value.length > 0}
                      <div>
                        <H4 class="">{indicator.type}</H4>
                        <ul>
                          {#each indicator.value as value}
                            <li class="text-sm dark:text-white text-black py-2">{value}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  {/each}
                </div>
                {/if}
              </div>
            {/if}
          {/if}
    {/each}
    </td>
  </tr>
{/if}
