<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { includeObjectKeys, excludeObjectKeys, isNumber } from '$utils';
  import { SortDirection, ContentData, type TableHeaderItemData, type TableRowData } from '$models';
  import TableRow from '$components/TableRow.svelte';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';

  export let headerData: TableHeaderItemData[];
  export let data: ContentData;
  export let sort: boolean = true;
  export let rowBorder: boolean = false;
  export let caption: string;

  let header_keys: string[] = headerData.map((v) => v.key);
  let rows: TableRowData[] = data.getResults().map((entry) => {
    let data = Object.values(includeObjectKeys(entry, header_keys));
    let dataComplementary = Object.entries(excludeObjectKeys(entry, header_keys));
    return { data, dataComplementary };
  });

  /* 
    WIP: pass RowData to the DataTableItem
    , sort the table based on data property of RowData
  */

  let sortStatus: Record<string, SortDirection> = {};
  let sortDirection: SortDirection = SortDirection.Ascending;
  let areColumnsNumber: boolean[] = rows[0].data.map((d: any) => isNumber(d));
  let sortColumnIndex: number = -1;

  function updateSortStatus(column_label: string): void {
    // reset all to "none"
    headerData.forEach((item : TableHeaderItemData) => {
      sortStatus[item.label] = SortDirection.None;
    });

    sortDirection === SortDirection.Ascending
      ? (sortDirection = SortDirection.Descending)
      : (sortDirection = SortDirection.Ascending);
    sortStatus[column_label] = sortDirection;
  }

  // let sortIcons: Record<string, { direction: string, icon: string }> = {
  //     'none': {
  //         direction: 'n',
  //         icon: 'list'
  //     },
  //     'ascending': {
  //         direction: 'w',
  //         icon: 'arrow'
  //     },
  //     'descending': {
  //         direction: 'e',
  //         icon: 'arrow'
  //     }
  // };

    $: sortedRows = rows;

  $: {
    // sort strings 
    if (sortColumnIndex > -1 && areColumnsNumber[sortColumnIndex] === false) {
      if (sortDirection === SortDirection.Ascending) {
        sortedRows = rows.sort((a: TableRowData, b: TableRowData) =>
          ascending(
            (a.data[sortColumnIndex] as string).toLowerCase(),
            (b.data[sortColumnIndex] as string).toLowerCase()
          )
        );
      } else {
        sortedRows = rows.sort((a: TableRowData, b: TableRowData) =>
          descending(
            (a.data[sortColumnIndex] as string).toLowerCase(),
            (b.data[sortColumnIndex] as string).toLowerCase()
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
          ascending(
            (a.data[sortColumnIndex] as number),
            (b.data[sortColumnIndex] as number)
          )
        );
      } else {
        sortedRows = rows.sort((a: TableRowData, b: TableRowData) =>
          descending(
            (a.data[sortColumnIndex] as number),
            (b.data[sortColumnIndex] as number)
          )
        );
      }
    }
  }
</script>

<div>
  <table class:rowBorder>
    {#if caption}
      <caption>{caption}</caption>
    {/if}
    <tbody>
      <!-- main header -->
      <tr>
        {#each headerData as item, i (item)}
          <th role="columnheader" scope="col">
            {item.label}
            {#if sort}
              <button
                on:click={() => {
                  sortColumnIndex = i;
                  updateSortStatus(item.label);
                }}
              >
                <span>^</span>
              </button>
             {#if item.tooltip}
                <Tooltip>
                  <span slot="icon">i</span>
                  <svelte:fragment slot="content">item.tooltip</svelte:fragment>
                </Tooltip>
             {/if}
            {/if}
          </th>
        {/each}
      </tr>
      {#each sortedRows as row, i (row)}
        <TableRow data={row}/>
      {/each}
    </tbody>
  </table>
</div>

<style>
</style>
