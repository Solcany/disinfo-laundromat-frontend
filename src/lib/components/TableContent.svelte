<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { cn } from '$utils';
  import { TABLE_CONTENT_SEARCH_HEADER  } from '$config';
  import {
    SortDirection,
    TableHeaderItemType,
    type ContentDataResult,
    type TableHeaderItemData,
  } from '$models';
  import TableHeaderItem from '$components/TableHeaderItem.svelte';
  import TableContentRow from '$components/TableContentRow.svelte';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';

  export let data: ContentDataResult[];
  let className: string | undefined = undefined;
  export { className as class };

  export let sortedData: ContentDataResult[] = [];
  let sortDirection: SortDirection = SortDirection.Ascending;
  let sortStatus: Record<string, SortDirection> = {};
  let sorter : TableHeaderItemData | undefined = undefined;

  $: {
    if (sorter && sortDirection !== SortDirection.None) {
      sortedData = sortData(data, sorter, /*sortColumnIndex,*/ sortDirection);
    } else {
      sortedData = data;
    }
  }

  function sortData(
    data: ContentDataResult[],
    sorter: TableHeaderItemData,

    direction: SortDirection
  ): ContentDataResult[] {
    return data.sort((a, b) => {
      const aValue = a[sorter.key];
      const bValue = b[sorter.key];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return -1;
      if (bValue == null) return 1;

      switch (sorter.type) {
        case TableHeaderItemType.String:
          return direction === SortDirection.Ascending
            ? ascending(String(aValue).toLowerCase(), String(bValue).toLowerCase())
            : descending(String(aValue).toLowerCase(), String(bValue).toLowerCase());
        case TableHeaderItemType.Number:
          return direction === SortDirection.Ascending
            ? ascending(Number(aValue), Number(bValue))
            : descending(Number(aValue), Number(bValue));
        default:
          return 0;
      }
    });
  }

  function handleHeaderItemClick(item: TableHeaderItemData) {
    sorter = item 
    updateSortStatus(item.key);
  }

  function updateSortStatus(key: string): void {
    TABLE_CONTENT_SEARCH_HEADER.forEach((item: TableHeaderItemData) => {
      sortStatus[item.key] = SortDirection.None;
    });

    sortDirection === SortDirection.Ascending
      ? (sortDirection = SortDirection.Descending)
      : (sortDirection = SortDirection.Ascending);
    sortStatus[key] = sortDirection;
  }
</script>

<div class={cn('', className)}>
  <table class="w-full max-w-full border-spacing-0">
    <colgroup>
      <col style="width: 20%" />
      <col style="width: 20%" />
      <col style="width: 55%" />
      <col style="width: 5%" />
    </colgroup>
    <thead class="box-shadow-border-bottom sticky top-0 dark:bg-gray7">
      {#each TABLE_CONTENT_SEARCH_HEADER as item (item)}
        <TableHeaderItem
          data={item}
          sortStatus={sortStatus[item.key]}
          onClick={() => {
            handleHeaderItemClick(item);
          }}
          class="first:pl-4"
        />
      {/each}
    </thead>
    <tbody>
      {#each sortedData as item, i (item)}
        <TableContentRow data={item} />
      {/each}
    </tbody>
  </table>
</div>
