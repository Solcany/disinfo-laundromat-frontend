<script lang="ts">
  import Button from '$components/Button.svelte';
  import type { LabeledValue } from '$models';
  export let row: [string, string | number][];
  export let rowComplementary: [string, string | number][];

  let isExpanded = false;

  function handleClick() {
    isExpanded = !isExpanded;
  }
</script>

<tr>
  <!-- row data -->
  {#each row as [_, value]}
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
    <td colSpan={row.length}>
      <table class="w-full bg-blue-100">
        <tbody>
          {#each rowComplementary as [label, value]}
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
