<script lang="ts">
	import type { LayoutData } from './$types';
  import '../styles/app.pcss';
  import '../styles/fonts.css';
  import { APP_TITLE } from '$config';
  import Header from '$components/Header.svelte';
  import Nav from '$components/Nav.svelte';
  import Footer from '$components/Footer.svelte';
  import ProgressBar from '$components/ProgressBar.svelte';
  import GDPRDialog from '$components/GDPRDialog.svelte';	
	export let data: LayoutData;
  $: showGDPR = data.gdpr_consent !== 'accepted' && data.gdpr_consent !== 'rejected';
</script>

<main class="border-box relative flex min-h-screen w-full flex-col bg-white dark:bg-gray6">
  <Header class="flex justify-center px-3 md:justify-between md:px-8 dark:bg-gray6">
    <h1 class="w-100 text-center md:w-auto md:text-left">
      <a class="font-sans text-xl font-light text-black dark:text-white" href="/">{APP_TITLE}</a>
    </h1>
    <Nav class="pt-3 md:pt-0" />
  </Header>
  <GDPRDialog open={showGDPR}/>
  <ProgressBar class="absolute left-0 top-0" />
  <slot />
  <Footer />
</main>
