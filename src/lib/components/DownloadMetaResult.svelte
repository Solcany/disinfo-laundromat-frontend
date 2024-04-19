<script lang="ts">
  import Button from '$components/Button.svelte';
  import { type TableMetaRowData } from '$models';
  export let data: TableMetaRowData[];

  function convertToCSV(data: TableMetaRowData[]): string {
    // Object to hold the mapping from type to column index
    const typeToIndex: { [type: string]: number } = {};
    // The final CSV rows, starting with the headers
    let csvContent: string[] = [];

    // First pass to discover all types and assign column indexes
    data.forEach((item) => {
      item.indicators.forEach((indicator) => {
        indicator.data.forEach((detail) => {
          if (!(detail.type in typeToIndex)) {
            // Assign a new column index to this type
            typeToIndex[detail.type] = Object.keys(typeToIndex).length;
          }
        });
      });
    });

    // Create the header row based on discovered types
    const headers = ['domain', ...Object.keys(typeToIndex)];
    csvContent.push(headers.join(','));

    // Second pass to build the CSV rows
    data.forEach((item) => {
      // Start with the domain
      const row = Array(headers.length).fill('');
      row[0] = item.domain;

      // Fill in the row with the values for each type
      item.indicators.forEach((indicator) => {
        indicator.data.forEach((detail) => {
          const index = typeToIndex[detail.type]; // Directly use the stored index
          const value = detail.value.join(';'); // Join array of strings into a single string
          row[index] = value;
        });
      });

      // Add the completed row to the CSV content
      csvContent.push(row.join(','));
    });

    return csvContent.join('\n');
  }

  function downloadCSV() {
    console.log(data);
    const csvStr = convertToCSV([...data]);
    const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  }
</script>

<Button on:click={downloadCSV} ariaLabel="download csv">Download CSV</Button>
