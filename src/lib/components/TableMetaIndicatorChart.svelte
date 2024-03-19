<script lang="ts">
  import { cn } from '$utils';
  import RectMapped from '$components/RectMapped.svelte'
  let className: string = '';
  export { className as class };

</script>

<div class="width-[100px]">
  <slot/>
</div>


