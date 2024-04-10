<script lang="ts">
  import { cn } from '$utils';
  let className: string | undefined = undefined;
  export { className as class };
</script>

<span class={cn('height-[1px] my-2 block w-full border-b-[1px] border-gray5', className)} />
