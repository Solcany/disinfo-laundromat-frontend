<script lang="ts">
  import { CaretDown, CaretUp } from 'phosphor-svelte';
  import type { ContentDataResult } from '$models';
  import { TABLE_CONTENT_SEARCH_MAIN_ROW,
           TABLE_CONTENT_SEARCH_MAIN_ROW_KEYS,
           TABLE_CONTENT_SEARCH_COMPLEMENTARY_ROW,
           TABLE_CONTENT_SEARCH_COMPLEMENTARY_ROW_KEYS,
           } from '$config';
  import { cn, domainToUrl } from '$utils';
  import Tooltip from '$components/Tooltip.svelte';
  import Link from '$components/Link.svelte';
  import Rect from '$components/Rect.svelte';
  import RectMapped from '$components/RectMapped.svelte';
  import H4 from '$components/H4.svelte';

  export let data: ContentDataResult;
  let className: string = '';
  export { className as class };
  
  let dataMain : [string, number | string | number[] | string[]][] = [];
  let dataComplementary : [string, number | string | number[] | string[]][] = [];
  let showComplementaryData: boolean  = false;
  let domainAssociations: string[] = [];

  $: setRows(data);
  $: setDomainAssociations(data);

  function setRows(data: ContentDataResult) {
    Object.entries(data).forEach(([key, value]) => {
      if (TABLE_CONTENT_SEARCH_MAIN_ROW_KEYS.includes(key)) {
        dataMain.push([key, value]);
      } else if (TABLE_CONTENT_SEARCH_COMPLEMENTARY_ROW_KEYS.includes(key)) {
        dataComplementary.push([key, value]);
      }
    });
  }

  function setDomainAssociations(data: ContentDataResult) {
    domainAssociations = data.hasOwnProperty('source') ? data.source : [] 
  }

  function handleClick() {
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
      : 'border-b-[1px] hover:cursor-s-resize'}">
    <!-- row data -->
    {#each dataMain as [key, value]}
      <td class="h-10 pr-6 text-sm text-black first:pl-4 dark:text-white">
        <div class="w-0 min-w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {#if key === 'domain'}
            <Link href={domainToUrl(String(value))}>{value}</Link>
            {#each domainAssociations as association}
              <div class="mr-2 inline-block">
                <Tooltip>
                  <svelte:fragment slot="icon">i</svelte:fragment>
                  <svelte:fragment slot="content">{association}</svelte:fragment>
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
  {#if showComplementaryData && dataComplementary.length > 0}
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
