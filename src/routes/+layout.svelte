<script>
  import '../styles/app.pcss';
  import '../styles/fonts.css';
  import {onMount} from 'svelte';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import ProgressBar from '$components/ProgressBar.svelte';

  //toggle darkmode 
  onMount(()=> {
   document.documentElement.classList.add('dark');
  })
</script>

  <Header/>
  <main class="relative flex min-h-screen w-full flex-col bg-white dark:bg-gray1 ">
    <ProgressBar class="absolute left-0 top-0" />
    <slot />
  </main>
  <Footer/>
