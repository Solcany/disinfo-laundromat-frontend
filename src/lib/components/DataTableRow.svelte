<script lang="ts">
</script>

<tr>
  <!-- row data -->
  {#each Object.entries(row) as [_, value]}
    <td>
      {value}
    </td>
  {/each}
  <!-- expand row button -->
  <td>
    <Button ariaLabel="expand row">^</Button>
  </td>
</tr>
<!-- expanded row data -->
<tr>
  <td colSpan={headers.length}>
    <div class="h-[100px] w-full bg-blue-100"></div>
  </td>
</tr>
