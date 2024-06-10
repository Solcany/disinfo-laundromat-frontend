<script lang="ts">
  import { CaretDown, CaretUp } from 'phosphor-svelte';
  import type { DomainAssociation } from '$models';
  import { type ContentSearchResult } from "$api";
  import {
    TABLE_CONTENT_SEARCH_MAIN_ROW,
    TABLE_CONTENT_SEARCH_MAIN_ROW_KEYS,
    TABLE_CONTENT_SEARCH_COMPLEMENTARY_ROW,
    TABLE_CONTENT_SEARCH_COMPLEMENTARY_ROW_KEYS,
    DOMAIN_ASSOCIATIONS
  } from '$config';
  import { cn, domainToUrl } from '$utils';
  import Tooltip from '$components/Tooltip.svelte';
  import Link from '$components/Link.svelte';
  import Rect from '$components/Rect.svelte';
  import RectMapped from '$components/RectMapped.svelte';
  import H4 from '$components/H4.svelte';

  export let data: ContentSearchResult;
  let className: string = '';
  export { className as class };

  let dataMain: [string, number | string | number[] | string[]][] = [];
  let dataComplementary: [string, number | string | number[] | string[]][] = [];
  let domainAssociations: DomainAssociation[] = [];
  let showComplementaryData: boolean = false;

  $: setRows(data);
  $: setDomainAssociations(data);

  function setRows(data: ContentSearchResult): void {
    Object.entries(data).forEach(([key, value]) => {
      // check each config individually in case an entry is to be shown in both main and complementary rows
      if (TABLE_CONTENT_SEARCH_MAIN_ROW_KEYS.includes(key)) {
        dataMain.push([key, value]);
      }
      if (TABLE_CONTENT_SEARCH_COMPLEMENTARY_ROW_KEYS.includes(key)) {
        dataComplementary.push([key, value]);
      }
    });
  }

  function setDomainAssociations(data: ContentSearchResult): void {
    if (!data.source) {
      return;
    }
    const keys: string[] = data.source;
    const associations: DomainAssociation[] = [];

    keys.forEach((key) => {
      for (const association of DOMAIN_ASSOCIATIONS) {
        if (key === association.value) {
          associations.push(association);
          break;
        }
      }
    });
    domainAssociations = associations;
  }

  function handleClick(): void {
    showComplementaryData = !showComplementaryData;
  }
</script>

{#if dataMain.length > 0}
  <tr
    on:click={handleClick}
    aria-label="click to expand row"
    role="button"
    class="w-full border-gray6 hover:bg-black {showComplementaryData
      ? 'border-b-0 hover:cursor-n-resize'
      : 'border-b-[1px] hover:cursor-s-resize'}"
  >
    <!-- row data -->
    {#each dataMain as [key, value]}
      <td class="h-10 pr-6 text-sm text-black first:pl-4 dark:text-white">
        <div
          class="flex w-0 min-w-full items-center overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {#if key === 'domain'}
            <Link
              href={domainToUrl(String(value))}
              on:click={(e) => {
                e.stopPropagation();
              }}>{value}</Link
            >
            {#each domainAssociations as association}
              <div class="mx-2 inline-block">
                <Tooltip variant="rectangle">
                  <svelte:fragment slot="icon">{association.glyph.toUpperCase()}</svelte:fragment>
                  <svelte:fragment slot="content">{association.label}</svelte:fragment>
                </Tooltip>
              </div>
            {/each}
          {:else if key === 'score'}
            <div class="relative block">
              <Rect height_px={5} class="relative fill-gray6" rx={1} ry={1} />
              <RectMapped
                value={Number(value)}
                value_max={100}
                rx={1}
                ry={1}
                height_px={5}
                class="absolute left-0 top-0 fill-indicator-1"
              />
            </div>
          {:else}
            {value}
          {/if}
        </div>
      </td>
    {/each}
    <!-- expand row glyph -->

    <td class="align-middle">
      <div class="flex w-full justify-end pr-3">
        {#if showComplementaryData}
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
  </tr>
  <!-- expanded row inner table -->
  {#if showComplementaryData && dataComplementary}
    <tr class="border-b-[1px] border-gray3 bg-black">
      <td colSpan={dataMain.length + 1}>
        <div class="w-full py-4">
          <table>
            <tbody>
              {#each dataComplementary as [key, value]}
                <tr>
                  <th class="pl-4">
                    <H4 class="text-left">
                      {key}
                    </H4>
                  </th>
                </tr>
                <tr>
                  <td class="pb-2 pl-4 font-sans text-sm text-black dark:text-white">
                    {#if key === 'url'}
                      <Link href={domainToUrl(String(value))}>{value}</Link>
                    {:else}
                      {value}
                    {/if}
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
