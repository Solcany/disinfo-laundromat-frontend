<script lang="ts">
  import { cn } from '$utils';
  export let value: number;
  export let value_max: number;
  export let height_px: number;
  export let rx: number = 0;
  export let ry: number = 0;
  let className: string | undefined = undefined;
  export { className as class };

  let height: string = height_px + 'px';

  $: actualWidthPercent = (value / value_max) * 100 + '%';
</script>

<svg
  width="100%"
  {height}
  class={cn('', className)}
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  {...$$restProps}
>
  <rect width={actualWidthPercent} {height} {rx} {ry} />
</svg>
