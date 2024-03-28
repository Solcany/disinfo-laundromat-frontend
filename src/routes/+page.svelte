<script lang="ts">
  import { goto } from '$app/navigation';
  import Tabs from '$components/Tabs.svelte';
  import Form from '$components/Form.svelte';
  import Label from '$components/Label.svelte';
  import H1 from '$components/H1.svelte';
  import H2 from '$components/H2.svelte';
  import H3 from '$components/H3.svelte';
  import H4 from '$components/H4.svelte';
  import P from '$components/P.svelte';
  import {
    Endpoint,
    QueryType,
    FormOrientation,
    type ApiResponse,
    type ApiContentData,
    type ApiFingerprintData
  } from '$models';
  import { queryApi } from '$api';
  import { contentFormDataStore } from '$stores/input';
  import { loadingStore } from '$stores/loading';
  import { contentStore, metadataStore } from '$stores/apiData.ts';
  export let data;

  async function handleSubmit(event: Event, query: { type: QueryType; endpoint: Endpoint }) {
    event.preventDefault();
    loadingStore.set(true);
    const target = event.target as HTMLFormElement;
    let formData = new FormData(target);

    if (query.endpoint === Endpoint.ParseUrl || query.endpoint === Endpoint.Content) {
      formData.set('combineOperator', 'OR');
    } else if (query.endpoint === Endpoint.Fingerprint && !formData.has('run_urlscan')) {
      formData.set('run_urlscan', '0');
    }

    console.log(formData);

    const response: ApiResponse<ApiContentData | ApiFingerprintData> = await queryApi(
      query.type,
      query.endpoint,
      formData
    );

    console.log(response);
    if (response.error) {
    } else {
      if (response.data) {
        if (query.endpoint === Endpoint.Content) {
          contentFormDataStore.set(formData);
          contentStore.set(response.data as ApiContentData);
          goto('/search/content');
        } else if (query.endpoint === Endpoint.Fingerprint) {
          metadataStore.set(response.data as ApiFingerprintData);
          goto('/search/metadata');
        }
        loadingStore.set(false);
      } else {
        loadingStore.set(false);
      }
    }
  }
  $: contentBasicFormConfig = data.contentBasicFormConfig;
  $: metadataBasicFormConfig = data.metadataBasicFormConfig;
</script>

<section class="grid grid-rows-2 px-3 pt-8 md:px-8">
  <div class=" grid grid-cols-1 gap-4 md:grid-cols-2">
    <div class="w-100 flex items-center justify-center justify-items-center py-8 md:py-0">
      <div>
        <H1 class="w-full text-4xl md:w-[500px] md:text-5xl">
          Uncover mirror websites. Understand content laundering. Safeguard content authenticity
          online.
        </H1>
        <p class="mt-4 font-sans text-sm font-light text-gray1 md:w-[400px]">
          <span class="font-bold"> Content Laundering </span> /ˈkɒntent lɔːndərɪŋ/
          <span class="text-xs"> noun </span><br /><span class="font-normal"
            >a strategic form of communication that disguises the origins of the content.</span
          >
        </p>
        <p></p>
      </div>
    </div>
    <div class="min-h-autot flex w-full items-center justify-center md:min-h-[500px] md:w-auto">
      <Tabs
        value="content similarity"
        class="w-full self-start rounded-md shadow-xl outline outline-[1px] outline-gray5 md:w-3/4"
        let:C
      >
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
              onSubmit={handleSubmit}
              orientation={FormOrientation.Horizontal}
            />
          {/if}
        </C.Content>
        <C.Content value="technical similarity">
          <P>
            Analysing technical relationships of a website with media websites in the corpus,
            including eg. state run media, fake news websites and Wikidata's list of news websites.
            For a full list see here.
            <br />
            <br />
            Potential use-cases include: understand sister sites, discover ad networks or analyse DNS
            ban circumvention practices.
            <br />
            <br />
            Enter a URL, the Laundromat will look for similarities with other entries in the database
            based on metadata overlap.
          </P>
          {#if metadataBasicFormConfig}
            <Form
              config={metadataBasicFormConfig}
              onSubmit={handleSubmit}
              orientation={FormOrientation.Horizontal}
            />
          {/if}
        </C.Content>
      </Tabs>
    </div>
  </div>
  <div class="mt-10 md:mt-20">
    <ul id="use case list" class="grid grid-cols-1 gap-x-10 md:grid-cols-3">
      <li class="">
        <H2 class="pb-4">Prove content laundering from state-owned outlets</H2>
        <P>
          Researchers from two European Universities, supported by the Alliance for Securing
          Democracy, reveal evidence of a small network operating in Poland and Germany that
          launders Russian state media content into the media mainstream. A sample of articles from
          problematic outlets, criticizing Ukraine President Zelensky was run through the
          Laundromat’s Content Search. The tool revealed that all the articles in the sample were
          lifted from Ria Novosti, an outlet belonging to the Russia Segodnya group. Read the
          report.
        </P>
      </li>
      <li class="pt-6 md:pt-0">
        <H2 class="pb-4">Find proxy websites that exist to overcome DNS bans</H2>
        <P>
          Both Russia Today and Sputnik News sites are currently subjected to DNS bans imposed by
          the European Commission. However, despite these restrictions, each site employf
          sophisticated techniques to reach audiences in Member Countries. Read the report to learn
          how researchers were able to utilize the Laundromat's website fingerprinting service to
          map the entire network of Russia Today proxy websites, using altered or entirely new
          domain names.
        </P>
      </li>
      <li class="pt-6 md:pt-0">
        <H2 class="pb-4">Tell if a site produces original content</H2>
        <P>
          Content laundering occurs when individuals or entities replicate website content without
          proper attribution and, in some cases, authorization. This method is commonly employed by
          disinformation operatives to disseminate problematic content and political propaganda
          efficiently. The Laundromat tool serves as an effective means to detect duplicate content
          online and substantiate instances of content plagiarism. See how to use the Laundromat for
          proving gaps in editorial transparency. Read the guide.
        </P>
      </li>
    </ul>
  </div>
</section>
<section class="flex flex-col md:flex-row">
  <div>
    <H3></H3>
    <ul>
      <li>
        <a href="https://gulbenkian.pt/emifund/" rel="nofollow">
          <img
            src="https://camo.githubusercontent.com/4644af047750ba3f45a2f3efcf9f746857215547882628e6e2a34ca806cc72ac/68747470733a2f2f7365637572696e6764656d6f63726163792e676d6675732e6f72672f77702d636f6e74656e742f75706c6f6164732f323032342f30322f454d49465f486f72697a6f6e74616c5f6c6f676f5f426c61636b2e706e67"
            alt="MJRC Logo"
            height="256"
            data-canonical-src="https://securingdemocracy.gmfus.org/wp-content/uploads/2024/02/EMIF_Horizontal_logo_Black.png"
            style="width: 100%;height:auto"
          />
        </a>
      </li>
    </ul>
  </div>

  <div>
    <H3></H3>
    <ul>
      <li>
        <a href="https://securingdemocracy.gmfus.org/" rel="nofollow">
          <img
            src="https://securingdemocracy.gmfus.org/wp-content/uploads/2023/05/ASD-Logo.png"
            alt="ASD Logo"
            data-canonical-src="https://securingdemocracy.gmfus.org/wp-content/uploads/2020/02/ASD_Logo_Black.png"
            style="width: 100%;height:auto"
          />
        </a>
      </li>
      <li>
        <a href="https://www.isdglobal.org/" rel="nofollow">
          <img
            src="https://securingdemocracy.gmfus.org/wp-content/uploads/2024/03/ISD-logo-ISD-Red.png"
            alt="ISD Logo"
            data-canonical-src="https://securingdemocracy.gmfus.org/wp-content/uploads/2020/02/ISD_Logo_Black.png"
            style="width: 100%;height:auto"
          />
        </a>
      </li>
      <li>
        <a href="https://www.uva.nl/en" rel="nofollow">
          <img
            src="https://securingdemocracy.gmfus.org/wp-content/uploads/2024/03/uva-logo-uvamerken_eng-1406x236-300dpi.png"
            alt="UvA Logo"
            data-canonical-src="https://securingdemocracy.gmfus.org/wp-content/uploads/2020/02/UvA_Logo_Black.png"
            style="width: 100%;height:auto"
          />
        </a>
      </li>
    </ul>
  </div>
</section>
