<script lang="ts">
  import { ascending, descending } from 'd3-array';
  import { cn } from '$utils';
  import type {
    TableFingerprintData,
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
  export let data: TableFingerprintData; 

  let className: string | undefined = undefined;
  export { className as class };
  let sortStatus: Record<string, SortDirection> = {};
  let sortDirection: SortDirection = SortDirection.Ascending;
  let sortColumnIndex: number = -1;
  let selfRow: TableMetaRowData | undefined = undefined;
  let rows: TableMetaRowData[] = [];
  let sortedRows: TableMetaRowData[] = [];

  $: selfRow =
    data.indicators && data.indicators.length > 0 ? getSelfRow(data.indicators) : undefined;
  $: rows = data.matches && data.matches.length > 0 ? getRows(data.matches) : [];

  $: {
    if (sortColumnIndex !== -1 && sortDirection !== SortDirection.None) {
      sortedRows = sortRows(rows, sortColumnIndex, sortDirection);
    } else {
      sortedRows = rows;
    }
  }

  type IndicatorDataItem = {
    domain_name: string;
    indicator_content: string | string[];
    indicator_type: string;
  };

  type MatchDataItem = {
    domain_name_y: string;
    match_type: string;
    match_value: string;
  };

  function getSelfRow(data: IndicatorDataItem[]): TableMetaRowData {
    const result: TableMetaRowData = {
      domain: '',
      indicators: []
    };

    if (data.length === 0) return result;

    result.domain = data[0].domain_name;
    const indicators: Record<string, Record<string, string[]>> = {};

    data.forEach(({ indicator_type, indicator_content }) => {
      const [tierStr, type] = indicator_type.split('-');
      const tier = `tier${tierStr}`;

      if (!indicators[tier]) {
        indicators[tier] = {};
      }
      if (!indicators[tier][type]) {
        indicators[tier][type] = [];
      }

      const content = Array.isArray(indicator_content) ? indicator_content : [indicator_content];
      indicators[tier][type].push(...content);
    });

    result.indicators = Object.entries(indicators).map(([tierKey, types]) => ({
      tier: parseInt(tierKey.replace('tier', ''), 10),
      data: Object.entries(types).map(([type, value]) => ({
        type,
        value
      }))
    }));

    return result;
  }

  function getRows(data: MatchDataItem[]): TableMetaRowData[] {
    // group match data by indicator tiers
    const grouped: Record<
      string,
      {
        domain: string;
        indicators: Record<string, { [type: string]: string[] }>;
        indicators_summary: IndicatorsSummary;
      }
    > = {};

    data.forEach(({ domain_name_y, match_type, match_value }) => {
      // extract tier and type from indicator string 
      const match = match_type.match(/^(\d+)-(.+)$/);
      if (!match) return;
      const tier: string = `tier${match[1]}`;
      const type: string = match[2];
      
      // initialise object props
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

    // Transform the grouped data into the final structure
    const rows: TableMetaRowData[] = Object.keys(grouped).map((domainKey) => {
      const domainGroup = grouped[domainKey];
      const indicators: TieredIndicator[] = Object.keys(domainGroup.indicators)
        .map((tierKey) => {
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
        })
        .sort((a, b) => a.tier - b.tier); // Sort indicators by tier.
      // Return the structured domain data, including the indicators and their summary.
      return {
        domain: domainGroup.domain,
        indicators,
        indicators_summary: domainGroup.indicators_summary
      };
    });

    return rows;
  }

  function sortRows(
    rows: TableMetaRowData[],
    columnIndex: number,
    direction: SortDirection
  ): TableMetaRowData[] {
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
        case TableHeaderItemType.IndicatorsSummary:
          const tiers = ['tier1', 'tier2', 'tier3'];

          for (let tier of tiers) {
            const tierValA: number = (aValue as IndicatorsSummary)[tier] || 0;
            const tierValB: number = (bValue as IndicatorsSummary)[tier] || 0;

            const result =
              tierValA !== tierValB
                ? sortDirection === SortDirection.Ascending
                  ? ascending(tierValA, tierValB)
                  : descending(tierValA, tierValB)
                : 0;
            if (result !== 0) return result;
          }
          const aTierCount = tiers.filter((tier) => tier in (aValue as IndicatorsSummary)).length;
          const bTierCount = tiers.filter((tier) => tier in (bValue as IndicatorsSummary)).length;

          return sortDirection === SortDirection.Ascending
            ? ascending(aTierCount, bTierCount)
            : descending(aTierCount, bTierCount);
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
  <table class="w-full max-w-full border-spacing-0">
    <!-- WIP: should col width be hardcoded? -->
    <!-- should this be somehow set dynamically -->
    <colgroup>
      <col style="width: 30" />
      <col style="width: 30%" />
      <col style="width: 40%" />
    </colgroup>
    <thead class="sticky top-0 z-50 w-full border-b-[1px] border-gray3 shadow-xl dark:bg-gray7">
      {#each headerData as data, i (data)}
        <TableHeaderItem
          {data}
          sortStatus={sortStatus[data.label]}
          onClick={() => {
            handleHeaderItemClick(i);
          }}
        />
      {/each}
    </thead>
    <tbody>
      {#if selfRow}
        <TableMetaRow data={selfRow} metadata={data.indicator_metadata} />
      {/if}
      {#each sortedRows as row, i (row)}
        <TableMetaRow data={row} metadata={data.indicator_metadata} />
      {/each}
    </tbody>
  </table>
</div>
