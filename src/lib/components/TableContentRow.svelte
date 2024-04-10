<script lang="ts">
  import { CaretDown, CaretUp } from 'phosphor-svelte';
  import type { TableContentRowData } from '$models';
  import { cn, domainToUrl } from '$utils';
  import Tooltip from '$components/Tooltip.svelte';
  import Link from '$components/Link.svelte';
  import Rect from '$components/Rect.svelte';
  import RectMapped from '$components/RectMapped.svelte';

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
      {#if key === 'domain'}
      <td class="h-10 first:pl-4 pr-6 text-sm text-black dark:text-white">
          <Link href={domainToUrl(String(value))}>{value}</Link>
          {#if tags.length > 0}
          {#each tags as tag}
          <div class="inline-block mr-2">
            <Tooltip>
              <svelte:fragment slot="icon">i</svelte:fragment>
              <svelte:fragment slot="content">{tag}</svelte:fragment>
            </Tooltip>
          </div>
          {/each}
          {/if}
        </td>
      {:else if key === 'score'}
      <td class="h-10 text-sm first:pl-4 text-black dark:text-white">
        <div class="my-1 pr-6">
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
        </div>
      </td>
      {:else}
      <td class="h-10 first:pl-4 pr-6 text-sm text-black dark:text-white">
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
