<script lang="ts">
	import { Dialog } from 'bits-ui';
	import Trigger from '$components/DialogTrigger.svelte';
	import Content from '$components/DialogContent.svelte';
	import Title from '$components/DialogTitle.svelte';
	import Description from '$components/DialogDescription.svelte';
	import Portal from '$components/DialogPortal.svelte';
	import Overlay from '$components/DialogOverlay.svelte';
	import Close from '$components/DialogClose.svelte';

	const C = {
		Trigger,
		Content,
		Title,
		Description,
		Portal,
		Overlay,
		Close	
	};
</script>

<Dialog.Root {...$$restProps}>
	<slot {C}/>
</Dialog.Root>
