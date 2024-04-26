<script lang="ts">
  import {onMount} from 'svelte';
  import type { Writable } from 'svelte/store'; 
  import { goto } from '$app/navigation';
  import Tabs from '$components/Tabs.svelte';
  import Form from '$components/Form.svelte';
  import Label from '$components/Label.svelte';
  import Button from '$components/Button.svelte';
  import CanvasParticles from '$components/CanvasParticles.svelte';
  import H1 from '$components/H1.svelte';
  import H2 from '$components/H2.svelte';
  import H3 from '$components/H3.svelte';
  import H4 from '$components/H4.svelte';
  import P from '$components/P.svelte';
  import Link from '$components/Link.svelte';
  import {
    Endpoint,
    QueryType,
    FormOrientation,
    type ApiResponse,
    type ApiContentData,
    type ApiFingerprintData
  } from '$models';
  import {
    USE_CASE1_FORM_DATA,
    USE_CASE2_FORM_DATA,
    USE_CASE3_FORM_DATA,
  } from '$config';
  import { objectToFormData, scrollToElementYCenter} from '$utils'; 
  import { queryApi } from '$api';
  import { handleApiSubmit } from '$form';
  import { contentFormDataStore, metadataFormDataStore } from '$stores/input';
  import { loadingStore } from '$stores/loading';
  import { contentStore, metadataStore } from '$stores/apiData.ts';

  type TabKind = "content similarity" | "technical similarity";

  export let data;
  let activeTab : TabKind = "content similarity";
  let tabsContainerElement: HTMLElement;
  let areTabsHighlighted: boolean = false;
  let isMounted: boolean = false;

  $: contentBasicFormConfig = data.contentBasicFormConfig;
  $: metadataBasicFormConfig = data.metadataBasicFormConfig;

  function setActiveTab(tab: TabKind) {
    activeTab = tab;
  }

  function setFormDataStore(store: Writable<FormData>, data: FormData ) {
    store.set(data); 
  }

  function highlightTabs() {
    areTabsHighlighted = true;
  }

  function handleCaseStudySearch(store: Writable<FormData>, formData: FormData, tab: TabKind) {
        setFormDataStore(store, formData);
        setActiveTab(tab);
        highlightTabs();
        scrollToElementYCenter(tabsContainerElement, 500);
  }

  onMount(() => {
    // particles engine load func sometimes breaks if document isn't ready
    isMounted=true;
  })

</script>

<svelte:head>
  <meta name="title" content="Information Laundromat"/>
</svelte:head>

<section class="grid grid-rows-2 px-3 md:px-8 relative">
  {#if isMounted}
    <CanvasParticles class="absolute top-0 left-0 bottom-0 right-0 "/>
  {/if}
  <div class="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2 md:pt-20 z-10">
    <div class="w-100 flex items-center justify-center py-8 md:py-0">
      <div>
        <H1  class="w-full text-4xl md:w-[500px] md:text-5xl">
          Uncover mirror websites. Understand content laundering. Safeguard content authenticity
          online.
        </H1>
        <p class="mt-4 font-sans text-sm font-light text-gray1">
          <span class="font-bold"> Content Laundering </span> /ˈkɒntent lɔːndərɪŋ/
          <span class="text-xs"> noun </span><br /><span class="font-normal"
            >a strategic form of communication that disguises the origins of the content.</span
          >
        </p>
        <p></p>
      </div>
    </div>

    <div bind:this={tabsContainerElement} class="flex w-full items-center justify-center z-10" >
      <Tabs
        bind:value={activeTab}
        autoSet={false}
        class="w-full self-start rounded-input shadow-xl outline outline-[1px] outline-gray5 md:w-3/4 lg:min-w-[600px] relative {areTabsHighlighted ? 'gradient-border' : ''}"
        let:C>
        <C.List>
          <C.Trigger value="content similarity" class="rounded-tl-md">Content Similarity</C.Trigger>
          <C.Trigger value="technical similarity" class="rounded-tr-md"
            >Technical Similarity</C.Trigger
          >
        </C.List>
        <C.Content value="content similarity">
          <P>
            Exploring potential content laundering practices. Enter an article URL or snippet of
            text to analyse content similarity. Check the search engines you want to use to power
            the search results.
          </P>
          {#if contentBasicFormConfig}
            <Form
              config={contentBasicFormConfig}
              formData={$contentFormDataStore}
              onSubmit={handleApiSubmit}
              orientation={FormOrientation.Horizontal}
            />
          {/if}
        </C.Content>
        <C.Content value="technical similarity">
          <P>
            Enter a website URL to analyse metadata similarity with a variety of media outlets,
            including both trusted, dubious and known disinformation news sources.
            <br /><br />

            This tool is particularly helpful to detect affiliate networks, sister sites,
            advertising collaborations, or DNS ban circumvention practices.
          </P>
          {#if metadataBasicFormConfig}
            <Form
              config={metadataBasicFormConfig}
              formData={$metadataFormDataStore}
              onSubmit={handleApiSubmit}
              orientation={FormOrientation.Horizontal}
            />
          {/if}
        </C.Content>
      </Tabs>
    </div>
  </div>
  <div class="mt-10 md:mt-32 z-10">
    <ul id="use-case-list" class="grid grid-cols-1 gap-x-10 md:grid-cols-3">
      <li class="">
        <H2 class="pb-4">Prove content laundering from state-owned outlets</H2>
        <P>
          Researchers from two European Universities, supported by the Alliance for Securing
          Democracy, reveal evidence of a small network operating in Poland and Germany that
          launders Russian state media content into mainstream media. A sample of articles from
          problematic outlets, criticizing Ukrainian President Zelensky, was run through the
          Laundromat’s content search. The tool revealed that all the articles in the sample were
          lifted from Ria Novosti, an outlet belonging to the Russian? Segodnya group.
        </P>
      </li>
      <li class="pt-6 md:pt-0">
        <H2 class="pb-4">Find proxy websites that exist to overcome DNS bans</H2>
        <P>
          Both Russia Today and Sputnik News are currently subjected to DNS bans imposed by the
          European Commission. However, despite these restrictions, each site employs sophisticated
          techniques to reach audiences in EU member countries. Read the report to learn how
          researchers were able to utilize the Laundromat's website fingerprinting service to map
          the entire network of Russia Today proxy websites, using altered or entirely new domain
          names.
        </P>
      </li>
      <li class="pt-6 md:pt-0">
        <H2 class="pb-4">Tell if a site produces original content</H2>
        <P>
          Content laundering occurs when individuals or entities replicate website content without
          proper attribution and, in some cases, authorization. This method is commonly employed by
          disinformation operatives to disseminate problematic content and political propaganda. The
          Laundromat tool serves as an effective means to detect duplicate content online and
          substantiate instances of content plagiarism. See how to use the Laundromat to prove gaps
          in editorial transparency. Read the guide.
        </P>
      </li>
    </ul>
  </div>
</section>

<section class="bg-gray7 px-3 py-32 md:px-8">
  <H2 class="mb-5">Case Studies</H2>
  <ul id="use-case-list" class="grid grid-cols-1 gap-x-10 md:grid-cols-3">
    <li class="">
      <H2 class="pb-4">Investigate the laundering of Russian content and narratives</H2>
      <P>
        This search shows how the Laundromat can be used to identify sites that are laundering
        content from Russian state media. It lists sample of articles from with a high degree of
        similarity, sharing much of their content with the original article. The report below digs
        into this phenomenon at scale and provides a detailed analysis of the network of sites that
        are laundering content from Russian state media.
      </P>
      <div>
        <Link
          href="https://securingdemocracy.gmfus.org/from-russia-with-spin-how-content-from-russian-state-media-is-laundered-by-polish-blogs/"
          class="block mt-2"
          >Read the report</Link
        >
        <div class="mt-4">
          <Button
          ariaLabel="set form data"
          on:click={() => handleCaseStudySearch(contentFormDataStore, 
                                                objectToFormData(USE_CASE1_FORM_DATA), 
                                                "content similarity")}>
            Try Search
          </Button>
        </div>
      </div>
    </li>
    <li class="pt-6 md:pt-0">
      <H2 class="pb-4">Explore RT's network of mirror websites </H2>
      <P>
         Researchers from the Instute for Strategic Dialoguee have uncovered several domain names that explicitly mirror (including branding, code, etc) a network of mirror websites of several RT websites. The Laundromat's Metadata Similarity feature can be used to iodentify the shared characteristics of the network of websites.
      </P>
      <div>
        <Link
          href="https://www.isdglobal.org/digital_dispatches/rt-articles-are-finding-their-way-to-european-audiences-but-how/>Read the report"
          class="block mt-2"
        >Read the report</Link>
        <div class="mt-4">
          <Button
          ariaLabel="set form data"
          on:click={() => handleCaseStudySearch(metadataFormDataStore, 
                                                objectToFormData(USE_CASE2_FORM_DATA), 
                                                "technical similarity")}>
            Try Search
          </Button>
        </div>
      </div>
    </li>
    <li class="pt-6 md:pt-0">
      <H2 class="pb-4">Generate OSINT leads and intelligence</H2>
      <P>
        In addition to identifying sites that are laundering content from Russian state media, the
        Laundromat can be used to generate leads and intelligence about how sites are made, who's
        advertising on them, their associated social media accounts, and more.
      </P>
      <div>
        <div class="mt-4">
          <Button
          ariaLabel="set form data"
          on:click={() => handleCaseStudySearch(metadataFormDataStore, 
                                                objectToFormData(USE_CASE3_FORM_DATA), 
                                                "technical similarity")}>
            Try Search
          </Button>
        </div>
      </div>

    </li>
  </ul>
</section>

<footer class="w-full bg-white">
  <div
    class="flex w-full flex-col px-3 py-6 md:flex-row md:items-center md:justify-center md:px-8 md:py-3"
  >
    <div class="pb-2 md:pb-0 md:pr-12">
      <H3 class="py-3 text-center md:text-left dark:text-black">Sponsoring Organizations</H3>
      <ul class="flex flex-col flex-nowrap items-center md:flex-row md:space-x-10">
        <li>
          <a href="https://gulbenkian.pt/emifund/" rel="nofollow">
            <img
              src="https://camo.githubusercontent.com/4644af047750ba3f45a2f3efcf9f746857215547882628e6e2a34ca806cc72ac/68747470733a2f2f7365637572696e6764656d6f63726163792e676d6675732e6f72672f77702d636f6e74656e742f75706c6f6164732f323032342f30322f454d49465f486f72697a6f6e74616c5f6c6f676f5f426c61636b2e706e67"
              alt="MJRC Logo"
              data-canonical-src="https://securingdemocracy.gmfus.org/wp-content/uploads/2024/02/EMIF_Horizontal_logo_Black.png"
              class="h-28 object-contain md:h-16"
            />
          </a>
        </li>
      </ul>
    </div>

    <div>
      <H3 class="py-3 text-center md:pb-3 md:text-left dark:text-black"
        >Implementing Organizations</H3
      >
      <ul class="flex flex-col flex-nowrap items-center md:flex-row md:space-x-10">
        <li class="py-3 md:py-0">
          <a href="https://securingdemocracy.gmfus.org/" rel="nofollow">
            <img
              src="https://securingdemocracy.gmfus.org/wp-content/uploads/2023/05/ASD-Logo.png"
              alt="ASD Logo"
              data-canonical-src="https://securingdemocracy.gmfus.org/wp-content/uploads/2020/02/ASD_Logo_Black.png"
              class="h-16 object-contain"
            />
          </a>
        </li>
        <li class="py-3 md:py-0">
          <a href="https://www.isdglobal.org/" rel="nofollow">
            <img
              src="https://securingdemocracy.gmfus.org/wp-content/uploads/2024/03/ISD-logo-ISD-Red.png"
              alt="ISD Logo"
              data-canonical-src="https://securingdemocracy.gmfus.org/wp-content/uploads/2020/02/ISD_Logo_Black.png"
              class="h-24 object-contain md:h-16"
            />
          </a>
        </li>
        <li class="py-3 md:py-0">
          <a href="https://www.uva.nl/en" rel="nofollow">
            <img
              src="https://securingdemocracy.gmfus.org/wp-content/uploads/2024/03/uva-logo-uvamerken_eng-1406x236-300dpi.png"
              alt="UvA Logo"
              data-canonical-src="https://securingdemocracy.gmfus.org/wp-content/uploads/2020/02/UvA_Logo_Black.png"
              class="h-24 object-contain md:h-16"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="block flex w-full justify-center px-3 py-6 md:px-8 md:pb-3 md:pt-5">
    <P class="w-full text-center md:w-1/2 dark:text-black ">
      The sole responsibility for any content supported by the European Media and Information Fund
      lies with the author(s) and it may not necessarily reflect the positions of the EMIF and the
      Fund Partners, the Calouste Gulbenkian Foundation and the European University Institute.</P
    >
  </div>
</footer>
