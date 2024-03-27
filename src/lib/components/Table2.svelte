<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { includeObjectKeys, excludeObjectKeys, isNumber } from '$utils';
  import {
    SortDirection,
    TableHeaderItemType,
    type ContentDataResult,
    type TableContentdata, 
    type TableHeaderItemData,
    type TableRowData
  } from '$models';
  import TableRow from '$components/TableRow.svelte';
  import TableHeaderItem from '$components/TableHeaderItem.svelte';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';

  export let headerData: TableHeaderItemData[];
  export let data: ContentDataResult[];
  export let caption: string;

  let rows: ContentDataResult[] = [];
  let sortedRows: ContentDataResult[] = [];

  let sortStatus: Record<string, SortDirection> = {};
  let sortDirection: SortDirection = SortDirection.Ascending;
  let areColumnsNumber: boolean[] = []; 
  let sortColumnIndex: number = -1;  

   $: rows = data;
   $: sortedRows = sortColumnIndex !== -1 && sortDirection !== SortDirection.None 
        ? sortRows(data, sortColumnIndex, sortDirection, areColumnsNumber) 
        : rows;

  function sortRows(
    rows: ContentDataResult[],
    columnIndex: number,
    direction: SortDirection
  ): ContentDataResult[] {
    const { key, type } = headerData[columnIndex];

    return rows.sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

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
       // case TableHeaderItemType.IndicatorsSummary:
       //     const tiers = ['tier1', 'tier2', 'tier3'];

       //     for (let tier of tiers) {
       //       const tierValA: number = (aValue as IndicatorsSummary)[tier] || 0;
       //       const tierValB: number = (bValue as IndicatorsSummary)[tier] || 0;

       //       const result = tierValA !== tierValB ? (
       //           sortDirection === SortDirection.Ascending ? 
       //           ascending(tierValA, tierValB) : 
       //           descending(tierValA, tierValB)
       //           ) : 0;
       //       if (result !== 0) return result;
       //     }
       //     const aTierCount = tiers.filter((tier) => tier in (aValue as IndicatorsSummary)).length;
       //     const bTierCount = tiers.filter((tier) => tier in (bValue as IndicatorsSummary)).length;

       //     return sortDirection === SortDirection.Ascending ? 
       //       ascending(aTierCount, bTierCount) : 
       //       descending(aTierCount, bTierCount);
        default:
          return 0;
      }
    });
  }


  function handleHeaderItemClick(index: number): void {
    const clickedColumnLabel = headerData[index].label;
    sortColumnIndex = index;
    updateSortStatus(clickedColumnLabel);
  }

  function updateSortStatus(column_label: string): void {
    // reset all to "none"
    headerData.forEach((item: TableHeaderItemData) => {
      sortStatus[item.label] = SortDirection.None;
    });

    sortDirection === SortDirection.Ascending
      ? (sortDirection = SortDirection.Descending)
      : (sortDirection = SortDirection.Ascending);
    sortStatus[column_label] = sortDirection;
  }


</script>

<div>
  <table class="w-full max-w-full border-spacing-0">
    {#if caption}
      <caption>{caption}</caption>
    {/if}
    <!-- WIP: should col width be hardcoded? -->
    <!-- should this be somehow set dynamically -->
    <colgroup>
      <col style="width: 20%" />
      <col style="width: 20%" />
      <col style="width: 55%" />
      <col style="width: 5%" />
    </colgroup>
    <thead class="sticky top-0 dark:bg-gray7">
      {#each headerData as data, i (data)}
        <TableHeaderItem
          {data}
          sortStatus={sortStatus[data.label]}
          onClick={() => {
            handleHeaderItemClick(i, data.label);
          }}
        />
      {/each}
    </thead>
    <tbody>
      {#each sortedRows as row, i (row)}
        <TableRow data={row} />
      {/each}
    </tbody>
  </table>
</div>

<style>
</style>
