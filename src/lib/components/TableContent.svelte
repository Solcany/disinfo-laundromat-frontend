<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { cn, includeObjectKeys, excludeObjectKeys, isNumber } from '$utils';
  import {
    SortDirection,
    TableHeaderItemType,
    type ContentDataResult,
    type TableHeaderItemData,
    type TableContentRowData
  } from '$models';
  import TableContentRow from '$components/TableContentRow.svelte';
  import TableHeaderItem from '$components/TableHeaderItem.svelte';
  import DownloadResult from '$components/DownloadResult.svelte';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';

  export let headerData: TableHeaderItemData[];
  export let data: ContentDataResult[];
  let className: string | undefined = undefined;
  export { className as class };

  const headerKeys: string[] = headerData.map(({ key }) => key);
  let rows: TableContentRowData[] = [];
  let sortedRows: TableContentRowData[] = [];
  let sortDirection: SortDirection = SortDirection.Ascending;
  let sortStatus: Record<string, SortDirection> = {};
  let sortColumnIndex: number = -1;

  $: rows =
    data && data.length > 0 && headerKeys && headerKeys.length > 0 ? getRows(data, headerKeys) : [];

  $: {
    if (sortColumnIndex !== -1 && sortDirection !== SortDirection.None) {
      sortedRows = sortRows(rows, headerData, sortColumnIndex, sortDirection);
    } else {
      sortedRows = rows;
    }
  }

  function getRows(data: ContentDataResult[], mainDataKeys: string[]): TableContentRowData[] {
    if (!data.length) {
      return [];
    }
    let rows = data.map((entry) => {
      // main data are rendered in the row header
      let dataMain = includeObjectKeys(entry, mainDataKeys);

      // complementary data are rendered in the expanded row
      const dataComplementary = excludeObjectKeys(entry, mainDataKeys);
      // tags are rendered in the row header alongside the first column
      const tags: string[] | undefined = entry.hasOwnProperty('source')
        ? Object.values(entry.source)
        : undefined;

      // manually insert content snippet to render it in row header & expanded row
      dataComplementary['Content snippet'] = entry.snippet;
      // remove source entry from data
      const { source, ...dataComplementaryRest } = dataComplementary;
      const row: TableContentRowData = {
        dataMain: Object.entries(dataMain),
        dataComplementary: Object.entries(dataComplementaryRest)
      };
      if (tags) {
        row.tags = tags;
      }
      return row;
    });
    return rows;
  }
  function sortRows(
    rows: TableContentRowData[],
    header: TableHeaderItemData[],
    columnIndex: number,
    direction: SortDirection
  ): TableContentRowData[] {
    const column_type = header[columnIndex].type;

    return rows.sort((a, b) => {
      const aValue = a.dataMain[columnIndex][1];
      const bValue = b.dataMain[columnIndex][1];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return -1;
      if (bValue == null) return 1;

      switch (column_type) {
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
      {#each headerData as data, i (data)}
        <TableHeaderItem
          {data}
          sortStatus={sortStatus[data.label]}
          onClick={() => {
            handleHeaderItemClick(i);
          }}
          class="first:pl-4"
        />
      {/each}
    </thead>
    <tbody>
      {#each sortedRows as row, i (row)}
        <TableContentRow data={row} />
      {/each}
    </tbody>
  </table>
</div>
