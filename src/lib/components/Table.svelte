<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { includeObjectKeys, excludeObjectKeys, isNumber } from '$utils';
  import {
    SortDirection,
    type ApiContentData,
    type ApiFingerprintData,
    type TableHeaderItemData,
    type TableRowData
  } from '$models';
  import TableRow from '$components/TableRow.svelte';
  import TableHeaderItem from '$components/TableHeaderItem.svelte';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';

  export let headerData: TableHeaderItemData[];
  export let data: ApiContentData;
  export let caption: string;

  const headerKeys: string[] = headerData.map(({ key }) => key);
  let rows: TableRowData[] = [];
  let sortedRows: TableRowData[] = [];
  let sortStatus: Record<string, SortDirection> = {};
  let sortDirection: SortDirection = SortDirection.Ascending;
  let areColumnsNumber: boolean[] = []; 
  let sortColumnIndex: number = -1; 

$: areColumnsNumber = rows.length > 0 ? rows[0].data.map((d: any) => isNumber(d[1])) : [];

$: rows = (data.results && data.results.length > 0) ? data.results.map((entry) => {
    const includedData = includeObjectKeys(entry, headerKeys);
    const complementaryData = excludeObjectKeys(entry, headerKeys);
    const domainAssociations = entry.hasOwnProperty('source')
      ? Object.values(entry.source)
      : undefined;
    const { source, ...rest } = complementaryData;     
    const cleanedComplementaryData = Object.entries(rest);
    const resultObject: TableRowData = {
      data: Object.entries(includedData),
      dataComplementary: cleanedComplementaryData
    };
    if (domainAssociations !== undefined) {
      resultObject.domainAssociations = domainAssociations;
    }
    return resultObject;
  }) : [];

 $: sortedRows = sortColumnIndex !== -1 && sortDirection !== SortDirection.None 
      ? sortRows(rows, sortColumnIndex, sortDirection, areColumnsNumber) 
      : rows;

  function sortRows(rows: TableRowData[], columnIndex: number , direction : SortDirection, areColumnsNumber : boolean[]) {
    return [...rows].sort((a, b) => {
      const aValue = a.data[columnIndex][1];
      const bValue = b.data[columnIndex][1];

      // Check for null or undefined values
      if (aValue == null || bValue == null) {
        return aValue == null ? (bValue == null ? 0 : 1) : -1;
      }

      if (areColumnsNumber[columnIndex]) {
        // Handle numeric sorting
        return direction === SortDirection.Ascending ? ascending(+aValue, +bValue) : descending(+aValue, +bValue);
      } else {
        // Handle string sorting
        return direction === SortDirection.Ascending 
          ? ascending(aValue.toString().toLowerCase(), bValue.toString().toLowerCase()) 
          : descending(aValue.toString().toLowerCase(), bValue.toString().toLowerCase());
      }
    });
  }

  function handleHeaderItemClick(i: number, label: string): void {
    sortColumnIndex = i;
    updateSortStatus(label);
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
