<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { cn } from '$utils';
  import TABLE_CONTENT_SEARCH_HEADER from '$config';
  import {
    SortDirection,
    TableHeaderItemType,
    type ContentDataResult,
    type TableHeaderItemData,
  } from '$models';
  //import TableContentRow from '$components/TableContentRow.svelte';
  import TableHeaderItem from '$components/TableHeaderItem.svelte';
  import DownloadResult from '$components/DownloadResult.svelte';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';

  export let data: ContentDataResult[];
  let className: string | undefined = undefined;
  export { className as class };

  let sortedData: ContentDataResult[] = [];
  let sortDirection: SortDirection = SortDirection.Ascending;
  let sortStatus: Record<string, SortDirection> = {};
  //let sortColumnIndex: number = -1;
  let sortKey : string | undefined = undefined;

//  $: {
//    if (sortColumnIndex !== -1 && sortDirection !== SortDirection.None) {
//      sortedData = sortData(data, sortColumnIndex, sortDirection);
//    } else {
//      sortedData = data;
//    }
//  }

  $: {
    if (sortKey && sortDirection !== SortDirection.None) {
      sortedData = sortData(data, sortKey, /*sortColumnIndex,*/ sortDirection);
    } else {
      sortedData = data;
    }
  }

  function sortData(
    data: ContentDataResult[],
    //columnIndex: number,
    sortKey: string,

    direction: SortDirection
  ): ContentDataResult[] {
    const type = TABLE_CONTENT_SEARCH_HEADER.find((item : TableHeaderItemData) => item.key === sortKey).type;

    return data.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return -1;
      if (bValue == null) return 1;

      switch (type) {
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

  //function handleHeaderItemClick(index: number): void {
  function handleHeaderItemClick(key: string) {
    //const clickedColumnLabel = TABLE_CONTENT_SEARCH_HEADER[index].key;
    sortKey = key 
    //sortColumnIndex = index;
    updateSortStatus(key);
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
  <DownloadResult {data}/> 
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
            handleHeaderItemClick(item.key);
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
