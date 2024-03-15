<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { includeObjectKeys, excludeObjectKeys, isNumber } from '$utils';
  import { SortDirection, type ApiContentData, type ApiFingerprintData, type TableHeaderItemData, type TableRowData } from '$models';
  import TableRow from '$components/TableRow.svelte';
  import TableHeaderItem from '$components/TableHeaderItem.svelte';
  import Button from '$components/Button.svelte';
  import Tooltip from '$components/Tooltip.svelte';

  export let headerData: TableHeaderItemData[];
  export let data: ApiFingerprintData;
  export let caption: string;

  const headerKeys: string[] = headerData.map(({ key }) => key);

// Define the structure of each item in the input array.
type MatchDataItem = {
  domain_name_y: string;
  match_type: string; // Format: "number-type"
  match_value: string;
};

// Define the structure for storing indicator data within a tier.
type IndicatorData = {
  type: string;
  value: string[];
};

// Define the structure for each tier, which contains an array of IndicatorData.
type TieredIndicator = {
  tier: number;
  data: IndicatorData[];
};

// Define a summary object that maps tier names to the count of values within each tier.
type IndicatorsSummary = {
  [tier: string]: number;
};

// Define the structure for the grouped data by domain, including the indicators and their summary.
type GroupedDomain = {
  domain: string;
  indicators: TieredIndicator[];
  indicators_summary: IndicatorsSummary;
};

// The main function that processes the array of MatchDataItem and returns an array of GroupedDomain.
function groupMatches(data: MatchDataItem[]): GroupedDomain[] {
  // The `grouped` object will hold the intermediate grouping of data by `domain_name_y`.
  const grouped: Record<string, { domain: string; indicators: Record<string, { [type: string]: string[] }>; indicators_summary: IndicatorsSummary }> = {};

  // Iterate over each item in the input data array.
  data.forEach(({ domain_name_y, match_type, match_value }) => {
    // Attempt to extract the tier number and type from the match_type string.
    const match = match_type.match(/^(\d+)-(.+)$/);
    if (!match) return; // Skip this item if the pattern doesn't match.

    // Construct the tier string (e.g., "tier1") and extract the type from the match.
    const tier: string = `tier${match[1]}`;
    const type: string = match[2];

    // Initialize the domain entry if it doesn't already exist in the grouped object.
    if (!grouped[domain_name_y]) {
      grouped[domain_name_y] = { domain: domain_name_y, indicators: {}, indicators_summary: {} };
    }

    // Initialize the tier entry within this domain if it doesn't exist.
    if (!grouped[domain_name_y].indicators[tier]) {
      grouped[domain_name_y].indicators[tier] = {};
      grouped[domain_name_y].indicators_summary[tier] = 0; // Also initialize this tier's count in the summary.
    }

    // Initialize the type array within this tier if it doesn't exist.
    if (!grouped[domain_name_y].indicators[tier][type]) {
      grouped[domain_name_y].indicators[tier][type] = [];
    }

    // Add the current match_value to the array for this type within the tier.
    grouped[domain_name_y].indicators[tier][type].push(match_value);
    // Increment the count for this tier in the summary.
    grouped[domain_name_y].indicators_summary[tier]++;
  });

  // Transform the grouped data into the final structure expected by the return type.
  const result: GroupedDomain[] = Object.keys(grouped).map(domainKey => {
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

  return result; // Return the final transformed collection.
}

  const grouped = groupMatches(data.matches);
  const rows: TableRowData[] = grouped.map((entry) => {
    const headData = {domain: '', indicators_summary: 0};
    headData["domain"] = entry.domain;
    headData["indicators_summary"] = Object.values(entry["indicators_summary"]).reduce((acc, v) => acc+v, 0);
    const complementaryData = {indicators: entry["indicators"]};
    // continue here
    // complementary data should be like this:

   // compData: [{"tier1": ["indicator1, indicator2"]},
   //  {"tier2": [ ... ]},
   //  {"tier3": [ ....]},
   //  ]
      
  })
  console.log(grouped);

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

 // function handleHeaderItemClick(i: number, label: string): void {
 //   sortColumnIndex = i;
 //   updateSortStatus(label);
 // }

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
<!--
<div>
  <table class="w-full max-w-full border-spacing-0">
    {#if caption}
      <caption>{caption}</caption>
    {/if}
    -->
    <!-- WIP: should col width be hardcoded? -->
    <!-- should this be somehow set dynamically -->
<!--
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

      -->
        <!-- {#if i === 0}
          <TableRow data={row} class="bg-red-500"/>
        {:else} -->
        <!--
        <TableRow data={row} />
        -->
        <!-- {/if} -->
        <!--
      {/each}
    </tbody>
  </table>
</div>
-->
