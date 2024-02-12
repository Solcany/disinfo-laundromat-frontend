<script lang="ts">
	import { cn } from '$utils';
	export let id: string;
	export let name: string;
	export let required: boolean = false;
	let className: string = '';
	export { className as class };
</script>

<input type="text" {id} {name} {required} class={cn('', className)} />
