<script lang="ts">
	let forId : string;
	let styles : string;
	export {forId as for, styles as style};
	export let onClick: (event: MouseEvent) => void;
</script>


<label on:click={onClick} for={forId} style={styles}>
	<slot/>
</label>
