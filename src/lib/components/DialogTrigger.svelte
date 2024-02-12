<script lang="ts">
  import { Dialog } from "bits-ui";
  import { cn } from '$utils';
	let className: string | undefined = undefined;
	export {className as class}; 

</script>

<Dialog.Trigger class={cn('inline-flex h-12 items-center justify-center whitespace-nowrap rounded-input bg-dark px-[21px] text-[15px] font-semibold text-background shadow-mini transition-colors hover:bg-dark/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98', className)}>
<slot/>
</Dialog.Trigger>
