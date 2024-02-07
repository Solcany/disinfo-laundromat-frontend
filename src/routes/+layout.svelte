<script>
	import '../app.pcss';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import ProgressBar from '$components/ProgressBar.svelte';
</script>

<div class="relative flex min-h-screen w-full flex-col bg-red-500 px-3 md:px-16">
	<ProgressBar class="absolute left-0 top-0" />
	<Header />
	<slot />
	<Footer class="mt-auto" />
</div>
