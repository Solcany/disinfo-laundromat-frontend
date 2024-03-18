<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { includeObjectKeys, excludeObjectKeys, isNumber } from '$utils';

  import { 
    type ApiContentData, 
    type ApiFingerprintData,
    type IndicatorData,
    type TieredIndicator,
    type IndicatorsSummary,
    type TableHeaderItemData, 
    type TableMetaRowData } from '$models';

  import  { SortDirection, } from '$models';


  import TableMetaRow from '$components/TableMetaRow.svelte';
  import TableHeaderItem from '$components/TableHeaderItem.svelte';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';

  export let headerData: TableHeaderItemData[];
  export let data: ApiFingerprintData;
  export let caption: string;

  const headerKeys: string[] = headerData.map(({ key }) => key);

type MatchDataItem = {
  domain_name_y: string;
  match_type: string; 
  match_value: string;
};

function getTableRowsFromMatchedDomains(data: MatchDataItem[]): TableMetaRowData[] {
  const grouped: Record<string, { domain: string; indicators: Record<string, { [type: string]: string[] }>; indicators_summary: IndicatorsSummary }> = {};

  data.forEach(({ domain_name_y, match_type, match_value }) => {
    const match = match_type.match(/^(\d+)-(.+)$/);
    if (!match) return; 
    const tier: string = `tier${match[1]}`;
    const type: string = match[2];

    if (!grouped[domain_name_y]) {
      grouped[domain_name_y] = { domain: domain_name_y, indicators: {}, indicators_summary: {} };
    }

    if (!grouped[domain_name_y].indicators[tier]) {
      grouped[domain_name_y].indicators[tier] = {};
      grouped[domain_name_y].indicators_summary[tier] = 0; 
    }

    if (!grouped[domain_name_y].indicators[tier][type]) {
      grouped[domain_name_y].indicators[tier][type] = [];
    }

    grouped[domain_name_y].indicators[tier][type].push(match_value);
    grouped[domain_name_y].indicators_summary[tier]++;
  });

  // Transform the grouped data into the final structure expected by the return type.
  const rows: TableMetaRowData[] = Object.keys(grouped).map(domainKey => {
    const domainGroup = grouped[domainKey];
    // Convert indicators from the intermediate structure to an array of TieredIndicator.
    const indicators: TieredIndicator[] = Object.keys(domainGroup.indicators).map(tierKey => {
      const data: IndicatorData[] = Object.entries(domainGroup.indicators[tierKey]).map(([type, values]) => ({
        type,
        value: values,
      }));
      return {
        tier: parseInt(tierKey.replace('tier', ''), 10), // Convert the tier string back to a number.
        data,
      };
    });
    // Return the structured domain data, including the indicators and their summary.
    return {
      domain: domainGroup.domain,
      indicators,
      indicators_summary: domainGroup.indicators_summary,
    };
  });

  return rows; 
}
  const rows: TableMetaRowData[] = getTableRowsFromMatchedDomains(data.matches);
  console.log('rws', rows);

 // const rows: TableRowData[] = data.results.map((entry) => {
 //   const includedData = includeObjectKeys(entry, headerKeys);
 //   const complementaryData = excludeObjectKeys(entry, headerKeys);

 //   const domainAssociations = entry.hasOwnProperty('source')
 //     ? Object.values(entry.source)
 //     : undefined;
 //   const { source, ...rest } = complementaryData;
 //   const cleanedComplementaryData = Object.entries(rest);

 //   const resultObject: TableRowData = {
 //     data: Object.entries(includedData),
 //     dataComplementary: cleanedComplementaryData
 //   };
 //   if (domainAssociations !== undefined) {
 //     resultObject.domainAssociations = domainAssociations;
 //   }
 //   return resultObject;
 // });

 // let sortStatus: Record<string, SortDirection> = {};
 // let sortDirection: SortDirection = SortDirection.Ascending;
 // let areColumnsNumber: boolean[] = rows[0].data.map((d: any) => isNumber(d[1]));
 // let sortColumnIndex: number = -1;

 function handleHeaderItemClick(i: number, label: string): void {
  // sortColumnIndex = i;
  // updateSortStatus(label);
 }

 // function updateSortStatus(column_label: string): void {
 //   // reset all to "none"
 //   headerData.forEach((item: TableHeaderItemData) => {
 //     sortStatus[item.label] = SortDirection.None;
 //   });

 //   sortDirection === SortDirection.Ascending
 //     ? (sortDirection = SortDirection.Descending)
 //     : (sortDirection = SortDirection.Ascending);
 //   sortStatus[column_label] = sortDirection;
 // }

 // $: sortedRows = rows;

 // $: {
 //   // sort strings
 //   if (sortColumnIndex > -1 && areColumnsNumber[sortColumnIndex] === false) {
 //     if (sortDirection === SortDirection.Ascending) {
 //       sortedRows = rows.sort((a: TableRowData, b: TableRowData) =>
 //         ascending(
 //           (a.data[sortColumnIndex][1] as string).toLowerCase(),
 //           (b.data[sortColumnIndex][1] as string).toLowerCase()
 //         )
 //       );
 //     } else {
 //       sortedRows = rows.sort((a: TableRowData, b: TableRowData) =>
 //         descending(
 //           (a.data[sortColumnIndex][1] as string).toLowerCase(),
 //           (b.data[sortColumnIndex][1] as string).toLowerCase()
 //         )
 //       );
 //     }
 //   }
 // }

 // $: {
 //   // sort numbers
 //   if (sortColumnIndex > -1 && areColumnsNumber[sortColumnIndex] === true) {
 //     if (sortDirection === SortDirection.Ascending) {
 //       sortedRows = rows.sort((a: TableRowData, b: TableRowData) =>
 //         ascending(a.data[sortColumnIndex][1] as number, b.data[sortColumnIndex][1] as number)
 //       );
 //     } else {
 //       sortedRows = rows.sort((a: TableRowData, b: TableRowData) =>
 //         descending(a.data[sortColumnIndex][1] as number, b.data[sortColumnIndex][1] as number)
 //       );
 //     }
 //   }
 // }
</script>
<div>
  <table class="w-full max-w-full border-spacing-0">
    {#if caption}
      <caption>{caption}</caption>
    {/if}
    <!-- WIP: should col width be hardcoded? -->
    <!-- should this be somehow set dynamically -->
    <colgroup>
      <col style="width: 52.5%" />
      <col style="width: 52.5%" />
      <col style="width: 5%" />
    </colgroup>
    <thead class="sticky top-0 dark:bg-gray7">
      <!--
      {#each headerData as data, i (data)}
        <TableHeaderItem
          {data}
          sortStatus={sortStatus[data.label]}
          onClick={() => {
            handleHeaderItemClick(i, data.label);
          }}/>
      {/each}
      -->
    </thead>
    <tbody>
      {#each rows as row, i (row)}
          <TableMetaRow data={row}/>
      {/each}
    </tbody>
  </table>
</div>
