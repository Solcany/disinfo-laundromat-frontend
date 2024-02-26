<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { includeObjectKeys, excludeObjectKeys, isNumber } from '$utils';
  import { SortDirection, type LabeledValue, type ContentResult } from '$models';
  import DataTableRow from "$components/DataTableRow.svelte";
  import Button from '$components/Button.svelte';

  export let header: LabeledValue[];
  export let data: ContentResult[];
  export let sort: boolean = true;
  export let rowBorder: boolean = false;
  export let caption: string;

  let header_keys : string[] = header.map((v) => v.value);
  let header_labels: string[] = header.map((v) => v.label);

  let rows: [string, (string | number)][][] = data.map((entry) =>
    Object.entries(includeObjectKeys(entry, header_keys))
  );
  let rowsComplementary : [string, (string|number)][][] = data.map((entry) => 
    Object.entries(excludeObjectKeys(entry, header_keys))
  );

  let sortStatus: Record<string, SortDirection> = {};
  let sortDirection: SortDirection = SortDirection.Ascending;
  let sortNumber: boolean[] = rows[0].map((d: any) => isNumber(d));

  $: {
    if (rows.length !== rowsComplementary.length) {
      throw new Error('rows and rowComplementary must have the same length');
    }
  }

  $: header_labels.forEach(label : string => {
      sortStatus[label] = SortDirection.None;
  })

    function updateSortStatus(column_label): void{
        // reset all to "none"
        header_labels.forEach(d => {
            sortStatus[d] = SortDirection.None;
        })

        sortDirection === SortDirection.Ascending ? sortDirection = SortDirection.Descending : sortDirection = SortDirection.Ascending;
        sortStatus[column_label] = sortDirection
    }


  //     sortDirection === 'ascending' ? sortDirection = 'descending' : sortDirection = 'ascending';
  //     sortStatus[column] = sortDirection;
  // }

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

  // headers.forEach((d: string) => {
  //     sortStatus[d] = "none";
  // });

  let sortBy: number = 0;

  // let sortedRows: any[] = rows;

  // $: {
  //     if (sortBy !== 'none' && sortNumber[sortBy] === false) {
  //         if (sortDirection === 'ascending') sortedRows = rows.sort((a, b) => ascending(a[sortBy].toLowerCase(), b[sortBy].toLowerCase()));
  //         else sortedRows = rows.sort((a, b) => descending(a[sortBy].toLowerCase(), b[sortBy].toLowerCase()));
  //     }
  // }

  // $: {
  //     if (sortBy !== 'none' && sortNumber[sortBy] === true) {
  //         if (sortDirection === 'ascending') sortedRows = rows.sort((a, b) => ascending(a[sortBy], b[sortBy]));
  //         else sortedRows = rows.sort((a, b) => descending(a[sortBy], b[sortBy]));
  //     }
  // }
</script>

<div>
  <table class:rowBorder>
    {#if caption}
      <caption>{caption}</caption>
    {/if}
    <tbody>
      <!-- main header -->
      <tr>
        {#each header_labels as label, i (label)}
          <th role="columnheader" scope="col">
            {label}
            {#if sort}
              <button
                class={i === sortBy ? 'sort selected' : 'sort'}
                on:click={() => {
                  sortBy = i;
                  updateSortStatus(header)
                }}>
                <span>^</span>
              </button>
            {/if}
          </th>
        {/each}
      </tr>
      {#each rows as row, i (row)}
        <DataTableRow {row} rowComplementary={rowsComplementary[i]}/>
      {/each}
    </tbody>
  </table>
</div>

<style>
</style>
