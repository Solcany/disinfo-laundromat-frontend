<script lang="ts">
	import { onMount } from 'svelte';
	import { Progress } from 'bits-ui';
	import { cn } from '$utils';
	import { loadingStore } from '$stores/loading.ts';

	let progressValue = 100; // 0;
	let isLoading = false;
	//let timer: number;

	let className: string = '';
	export { className as class };

	let unsubscribe = loadingStore.subscribe((value: boolean) => {
		if (value) {
			isLoading = true;
			//timer = setTimeout(() => {
			//	console.log('timeout');
			//	progressValue = 100;
			//}, 1000);
		} else {
			isLoading = false;
			//clearTimeout(timer);
		}
	});

	onMount(() => {
		return () => {
			//clearTimeout(timer);
			unsubscribe();
		};
	});
</script>

{#if isLoading}
	<Progress.Root
		value={progressValue}
		max={100}
		class={cn('shadow-mini-inset relative h-[15px] w-screen overflow-hidden', className)}
	>
		<div
			class="shadow-mini-inset absolute h-full w-full flex-1 bg-blue-500 transition-all duration-1000 ease-linear"
			style={`transform: translateX(-${100 - (100 * (progressValue ?? 0)) / (100 ?? 1)}%)`}
		/>
	</Progress.Root>
{/if}
