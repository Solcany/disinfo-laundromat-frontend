<script lang="ts">
  import { cn } from '$utils';
  export let height_px: number;
  export let rx: number = 0;
  export let ry: number = 0;

  let className: string = '';
  export { className as class };
  let height : string = height_px + 'px';

</script>

<svg width="100%" height={height} class={cn('', className)} version="1.1" xmlns="http://www.w3.org/2000/svg" {...$$restProps}>
  <rect width="100%" height={height} rx={rx} ry={ry}/>
</svg>
