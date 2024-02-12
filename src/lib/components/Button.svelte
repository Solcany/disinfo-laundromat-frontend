<script lang="ts">
	import { cn } from '$utils';
	export let ariaLabel: string;
	export let onClick: () => void;
	let className: string = '';
	export { className as class };
</script>

<button on:click={onClick} aria-label={ariaLabel} class={cn('', className)} {...$$restProps}>
	<slot />
</button>
