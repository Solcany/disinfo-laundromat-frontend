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

  let tags = (data.hasOwnProperty('tags') ? data.tags : []) as string[];

  let isExpanded = false;

  function handleClick() {
    isExpanded = !isExpanded;
  }
</script>

{#if data.dataMain.length > 0}
  <tr
    on:click={handleClick}
    aria-label="click to expand row"
role="button"
    class="w-full border-gray3 hover:bg-black {isExpanded
      ? 'border-b-0 hover:cursor-n-resize'
      : 'border-b-[1px] hover:cursor-s-resize'}"
  >
    <!-- row data -->
    {#each data.dataMain as [key, value]}
      <td class="h-10 pr-6 text-sm text-black first:pl-4 dark:text-white">
        <div class="w-0 min-w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {#if key === 'domain'}
            <Link href={domainToUrl(String(value))}>{value}</Link>
            {#if tags.length > 0}
              {#each tags as tag}
                <div class="mr-2 inline-block">
                  <Tooltip>
                    <svelte:fragment slot="icon">i</svelte:fragment>
                    <svelte:fragment slot="content">{tag}</svelte:fragment>
                  </Tooltip>
                </div>
              {/each}
            {/if}

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
</tr>
  <!-- expanded row inner table -->
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
