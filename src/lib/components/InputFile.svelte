<script lang="ts">
  let selectedFile: File | undefined;
  let errorMessage = '';
  export let onSubmit: (file: File) => void;

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      if (file.type === 'text/csv') {
        selectedFile = file;
        errorMessage = '';
      } else {
        errorMessage = 'Please drop a CSV file.';
      }
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function handleFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (file.type === 'text/csv') {
        selectedFile = file;
        errorMessage = '';
      } else {
        errorMessage = 'Please select a CSV file.';
      }
    }
  }
  function handleSubmit() {
    if (selectedFile) {
      onSubmit(selectedFile);
    } else {
      errorMessage = 'Please select a CSV file.';
    }
  }
</script>

<div class="drop-area" on:drop={handleDrop} on:dragover={handleDragOver}>
  <p>Drop CSV file here or click to browse</p>
  <label for="fileUpload" class="custom-file-upload">
    <i class="fa fa-cloud-upload"></i> or browse
  </label>
  <input
    id="fileUpload"
    type="file"
    on:change={handleFileInputChange}
    accept=".csv"
    class="hidden"
  />
  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}
</div>

<style>
  .drop-area {
    border: 2px dashed #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }

  .error-message {
    color: red;
  }
  input[type='file'] {
    display: none;
  }
  .custom-file-upload {
    display: inline-block;
    cursor: pointer;
  }
</style>
