<script lang="ts">
    export let data: Record<string, any>[]; 
    // Function to convert JS object to CSV, handling array values
    function convertToCSV(objArray: Record<string, any>[]): string {
        let str: string = '';

        // Extract headers
        const header = Object.keys(objArray[0]);
        str += header.join(',') + '\r\n';

        // Extract rows
        for (let i = 0; i < objArray.length; i++) {
            let line = '';
            for (let index in objArray[i]) {
                if (line !== '') line += ',';
                const value = objArray[i][index];
                // Check if the value is an array
                if (Array.isArray(value)) {
                    // Convert array to string separated by "; " or any other separator that fits your data
                    line += '"' + value.join('; ') + '"';
                } else {
                    line += '"' + value.toString().replace(/"/g, '""') + '"';
                }
            }
            str += line + '\r\n';
        }
        return str;
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

<button on:click={downloadCSV}>Download CSV</button>
