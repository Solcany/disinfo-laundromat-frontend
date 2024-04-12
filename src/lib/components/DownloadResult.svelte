<script lang="ts">
    import Button from "$components/Button.svelte";
    export let data: Record<string, any>[]; 

    function convertToCSV(objArray: Record<string, any>[]): string {
        let str: string = '';

        const header = Object.keys(objArray[0]);
        str += header.join(',') + '\r\n';

        for (let i = 0; i < objArray.length; i++) {
            let line = '';
            for (let index in objArray[i]) {
                if (line !== '') line += ',';
                const value = objArray[i][index];
                if (Array.isArray(value)) {
 
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

<Button on:click={downloadCSV} ariaLabel="download csv">Download CSV</Button>
