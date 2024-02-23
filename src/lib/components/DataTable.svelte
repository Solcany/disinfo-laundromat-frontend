<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { includeObjectKeys, excludeObjectKeys } from '$utils';
  import type { LabeledValue, ContentResult } from '$models';
  import DataTableRow from "$components/DataTableRow.svelte";
  import Button from '$components/Button.svelte';

  export let header: LabeledValue[];
  export let data: ContentResult[];
  export let sort: boolean = true;
  export let rowBorder: boolean = false;
  export let caption: string;

  let header_keys : string[] = header.map((v) => v.value);
  let rows: [string, (string | number)][][] = data.map((entry) =>
    Object.entries(includeObjectKeys(entry, header_keys))
  );
  let rowsComplementary : [string, (string|number)][][] = data.map((entry) => 
    Object.entries(excludeObjectKeys(entry, header_keys))
  );

  let sortStatus: Record<string, string> = {};
  let sortDirection: string = 'ascending';

  $: {
    if (rows.length !== rowsComplementary.length) {
      throw new Error('rows and rowComplementary must have the same length');
    }
  }
  // let sortNumber: boolean[] = rows[0].map((d: any) => !isNaN(d));

  // function updateSortStatus(column: string, index: number): void {
  //     // reset all to "none"
  //     headers.forEach((d: string) => {
  //         sortStatus[d] = "none";
  //     });

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
        {#each header as header_item, i (header_item)}
          <th role="columnheader" scope="col">
            {header_item.label}
            {#if sort}
              <button
                class={i === sortBy ? 'sort selected' : 'sort'}
                on:click={() => {
                  sortBy = i;
                  //updateSortStatus(header, i)
                }}
              >
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
