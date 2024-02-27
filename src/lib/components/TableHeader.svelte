<script lang="ts">
  import TableHeaderItem from '$components/TableHeaderItem.svelte';

  enum HeaderVariant {
    Content,
    Metadata
  }

  export let variant: HeaderVariant = HeaderVariant.Content;
</script>

<div class="w-full">
  <ul>
    <li></li>
  </ul>
</div>
