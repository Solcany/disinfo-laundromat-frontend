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

  const rows: TableRowData[] = data.results.map((entry) => {
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
  });

  let sortStatus: Record<string, SortDirection> = {};
  let sortDirection: SortDirection = SortDirection.Ascending;
  let areColumnsNumber: boolean[] = rows[0].data.map((d: any) => isNumber(d[1]));
  let sortColumnIndex: number = -1;

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

  $: sortedRows = rows;

  $: {
    // sort strings
    if (sortColumnIndex > -1 && areColumnsNumber[sortColumnIndex] === false) {
      if (sortDirection === SortDirection.Ascending) {
        sortedRows = rows.sort((a: TableRowData, b: TableRowData) =>
          ascending(
            (a.data[sortColumnIndex][1] as string).toLowerCase(),
            (b.data[sortColumnIndex][1] as string).toLowerCase()
          )
        );
      } else {
        sortedRows = rows.sort((a: TableRowData, b: TableRowData) =>
          descending(
            (a.data[sortColumnIndex][1] as string).toLowerCase(),
            (b.data[sortColumnIndex][1] as string).toLowerCase()
          )
        );
      }
    }
  }

  $: {
    // sort numbers
    if (sortColumnIndex > -1 && areColumnsNumber[sortColumnIndex] === true) {
      if (sortDirection === SortDirection.Ascending) {
        sortedRows = rows.sort((a: TableRowData, b: TableRowData) =>
          ascending(a.data[sortColumnIndex][1] as number, b.data[sortColumnIndex][1] as number)
        );
      } else {
        sortedRows = rows.sort((a: TableRowData, b: TableRowData) =>
          descending(a.data[sortColumnIndex][1] as number, b.data[sortColumnIndex][1] as number)
        );
      }
    }
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
        <!-- {#if i === 0}
          <TableRow data={row} class="bg-red-500"/>
        {:else} -->
        <TableRow data={row} />
        <!-- {/if} -->
      {/each}
    </tbody>
  </table>
</div>

<style>
</style>
