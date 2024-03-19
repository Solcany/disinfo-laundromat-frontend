<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { includeObjectKeys, excludeObjectKeys, isNumber } from '$utils';
  import type {
    ApiContentData,
    ApiFingerprintData,
    IndicatorData,
    TieredIndicator,
    IndicatorsSummary,
    TableHeaderItemData,
    TableMetaRowData
  } from '$models';
  import { SortDirection, TableHeaderItemType } from '$models';

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
    const grouped: Record<
      string,
      {
        domain: string;
        indicators: Record<string, { [type: string]: string[] }>;
        indicators_summary: IndicatorsSummary;
      }
    > = {};

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
    const rows: TableMetaRowData[] = Object.keys(grouped).map((domainKey) => {
      const domainGroup = grouped[domainKey];
      // Convert indicators from the intermediate structure to an array of TieredIndicator.
      const indicators: TieredIndicator[] = Object.keys(domainGroup.indicators).map((tierKey) => {
        const data: IndicatorData[] = Object.entries(domainGroup.indicators[tierKey]).map(
          ([type, values]) => ({
            type,
            value: values
          })
        );
        return {
          tier: parseInt(tierKey.replace('tier', ''), 10), // Convert the tier string back to a number.
          data
        };
      });
      // Return the structured domain data, including the indicators and their summary.
      return {
        domain: domainGroup.domain,
        indicators,
        indicators_summary: domainGroup.indicators_summary
      };
    });

    return rows;
  }
  const rows: TableMetaRowData[] = getTableRowsFromMatchedDomains(data.matches);

  let sortStatus: Record<string, SortDirection> = {};
  let sortDirection: SortDirection = SortDirection.Ascending;
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
    if (
      sortColumnIndex > -1 &&
      headerData[sortColumnIndex].key &&
      headerData[sortColumnIndex].type &&
      headerData[sortColumnIndex].type === TableHeaderItemType.String
    ) {
      const key = headerData[sortColumnIndex].key;

      if (sortDirection === SortDirection.Ascending) {
        sortedRows = rows.sort((a: TableMetaRowData, b: TableMetaRowData) =>
          ascending((a[key] as string).toLowerCase(), (b[key] as string).toLowerCase())
        );
      } else {
        sortedRows = rows.sort((a: TableMetaRowData, b: TableMetaRowData) =>
          descending((a[key] as string).toLowerCase(), (b[key] as string).toLowerCase())
        );
      }
    }
  }
  function sortRows() {
    if (!rows || rows.length === 0) {
      sortedRows = [];
      return;
    }

    if (
      sortColumnIndex > -1 &&
      headerData[sortColumnIndex]?.key &&
      sortDirection !== SortDirection.None
    ) {
      const { key, type } = headerData[sortColumnIndex];

      const sorter = (a: TableMetaRowData, b: TableMetaRowData) => {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue == null && bValue == null) {
          return 0; // Consider them equal if both are null/undefined
        } else if (aValue == null) {
          return -1; // Consider a less if aValue is null/undefined
        } else if (bValue == null) {
          return 1; // Consider b less if bValue is null/undefined
        }

        switch (type) {
          case TableHeaderItemType.String:
            if (sortDirection === SortDirection.Ascending) {
              return ascending(String(aValue).toLowerCase(), String(bValue).toLowerCase());
            } else {
              return descending(String(aValue).toLowerCase(), String(bValue).toLowerCase());
            }
          case TableHeaderItemType.Number:
            if (sortDirection === SortDirection.Ascending) {
              return ascending(Number(aValue), Number(bValue));
            } else {
              return descending(Number(aValue), Number(bValue));
            }
          default:
            return 0;
        }
      };

      sortedRows = rows.sort(sorter);
    } else {
      sortedRows = rows;
    }
  }

  $: sortRows(), [rows, sortColumnIndex, sortDirection, headerData];
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
        <TableMetaRow data={row} />
      {/each}
    </tbody>
  </table>
</div>
