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

<tr
  on:click={handleClick}
  aria-label="click to expand row"
  class="w-full border-gray3 hover:bg-black {isExpanded
    ? 'border-b-0 hover:cursor-n-resize'
    : 'border-b-[1px] hover:cursor-s-resize'}"
>
  <!-- the domain column -->
  <td class="py-6 pl-4 text-sm text-black dark:text-white">
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
  <td class="text-sm text-black dark:text-white">
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
          <div class="relative z-0 my-1 block">
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
    <div class="flex w-full justify-end pr-3">
      {#if isExpanded}
        <span class="shrink-0">
          <CaretUp class="fill-black dark:fill-white" weight="bold" size={20} />
        </span>
      {:else}
        <span class="shrink-0"
          ><CaretDown class="fill-black dark:fill-white" weight="bold" size={20} /></span
        >
      {/if}
    </div>
  </td>
  <td></td>
</tr>

<!-- expanded row -->
{#if isExpanded && data.indicators && data.indicators.length > 0}
  <tr class="border-b-[1px] border-gray3 bg-black">
    <td colSpan={3}>
      {#each data.indicators as entry}
        {#if entry.tier}
          {#if entry.tier === 1}
            <div class="block w-full py-4 pl-3">
              <H3 class="block w-full text-indicator-1 dark:text-indicator-1"
                >Conclusive Metadata</H3
              >
              {#if entry.data && entry.data.length > 0}
                <div class="grid w-full grid-cols-3 gap-4 pt-2">
                  {#each entry.data as indicator}
                    {#if indicator.type && indicator.value && indicator.value.length > 0}
                      <div>
                        <div class="flex items-center">
                          <H4 class="pr-2">{indicator.type}</H4>
                          <Tooltip>
                            <svelte:fragment slot="icon">i</svelte:fragment>
                            <svelte:fragment slot="content"
                              >{metadata[entry.tier + '-' + indicator.type]
                                .description}</svelte:fragment
                            >
                          </Tooltip>
                        </div>
                        <ul>
                          {#each indicator.value as value}
                            <li class="py-2 text-sm text-black dark:text-white">{value}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>
          {:else if entry.tier === 2}
            <div class="w-full py-4 pl-3">
              <H3 class="block w-full text-indicator-2 dark:text-indicator-2"
                >Associative Metadata</H3
              >
              {#if entry.data && entry.data.length > 0}
                <div class="grid w-full grid-cols-3 gap-4 pt-2">
                  {#each entry.data as indicator}
                    {#if indicator.type && indicator.value && indicator.value.length > 0}
                      <div>
                        <div class="flex items-center">
                          <H4 class="pr-2">{indicator.type}</H4>
                          <Tooltip>
                            <svelte:fragment slot="icon">i</svelte:fragment>
                            <svelte:fragment slot="content"
                              >{metadata[entry.tier + '-' + indicator.type]
                                .description}</svelte:fragment
                            >
                          </Tooltip>
                        </div>
                        <ul>
                          {#each indicator.value as value}
                            <li class="py-2 text-sm text-black dark:text-white">{value}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>
          {:else if entry.tier === 3}
            <div class="w-full py-4 pl-3">
              <H3 class="block w-full text-indicator-3 dark:text-indicator-3">Tertiary Metadata</H3>
              {#if entry.data && entry.data.length > 0}
                <div class="grid w-full grid-cols-3 gap-4 pt-2">
                  {#each entry.data as indicator}
                    {#if indicator.type && indicator.value && indicator.value.length > 0}
                      <div>
                        <div class="flex items-center">
                          <H4 class="pr-2">{indicator.type}</H4>
                          <Tooltip>
                            <svelte:fragment slot="icon">i</svelte:fragment>
                            <svelte:fragment slot="content"
                              >{metadata[entry.tier + '-' + indicator.type]
                                .description}</svelte:fragment
                            >
                          </Tooltip>
                        </div>
                        <ul>
                          {#each indicator.value as value}
                            <li class="py-2 text-sm text-black dark:text-white">{value}</li>
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
