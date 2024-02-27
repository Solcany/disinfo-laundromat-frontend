<script lang="ts">
  import Button from '$components/Button.svelte';
  import type { TableRowData } from '$models';
  export let data: TableRowData;

  let isExpanded = false;

  function handleClick() {
    isExpanded = !isExpanded;
  }
</script>

<tr>
  <!-- row data -->
  {#each data.data as value}
    <td>
      {value}
    </td>
  {/each}
  <!-- expand row button -->
  <td>
    <Button ariaLabel="expand row" onClick={handleClick}>^</Button>
  </td>
</tr>
<!-- expanded row data -->
{#if isExpanded}
  <tr>
    <td colSpan={data.data.length}>
      <table class="w-full bg-blue-100">
        <tbody>
          {#each data.dataComplementary as [label, value]}
            <tr>
              <th>
                {label}
              </th>
            </tr>
            <tr>
              <td>
                {value}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </td>
  </tr>
{/if}
