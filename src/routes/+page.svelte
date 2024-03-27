<script lang="ts">
  import { goto } from '$app/navigation';
  import Tabs from '$components/Tabs.svelte';
  import Form from '$components/Form.svelte';
  import Label from '$components/Label.svelte';
  import H1 from '$components/H1.svelte';
  import H2 from '$components/H2.svelte';
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
  import { inputStore } from '$stores/input';
  import { loadingStore } from '$stores/loading';
  import { contentStore, metadataStore } from '$stores/apiData.ts';
  export let data;

  async function handleSubmit(event: Event, query: { type: QueryType; endpoint: Endpoint }) {
    event.preventDefault();
    loadingStore.set(true);
    const target = event.target as HTMLFormElement;
    let formData = new FormData(target);

     if (query.endpoint === Endpoint.ParseUrl || Endpoint.ContentBasic || Endpoint.ContentAdvanced && !formData.has('combineOperator')) {
        formData.set('combineOperator', 'OR');
      } else if (query.endpoint === Endpoint.Fingerprint && !formData.has('run_urlscan')) {
      formData.set('run_urlscan', '0');
    }

    if (query.endpoint === Endpoint.ContentBasic) {
      formData.set('isApi', 'true');
    }

    const response: ApiResponse<ApiContentData | ApiFingerprintData> = await queryApi(
      query.type,
      query.endpoint,
      formData
    );

    if (response.error) {
    } else {
      if (response.data) {
        if (query.endpoint === Endpoint.ContentBasic || Endpoint.ContentAdvanced
          ) {
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
 // $: urlFormConfig = data.urlFormConfig;
  $: contentBasicFormConfig = data.contentBasicFormConfig;
  $: metadataFormConfig = data.metadataFormConfig;
</script>

<section class="pt-8 grid grid-rows-2 px-3 md:px-8">
  <div class=" grid grid-cols-1 gap-4 md:grid-cols-2">
    <div class="w-100 py-8 md:py-0 flex items-center justify-center justify-items-center">
      <div>
        <H1 class="w-full md:w-[500px] text-4xl md:text-5xl">
        Uncover mirror websites. Understand content laundering. Safeguard content authenticity online.
        </H1>
        <p class="mt-4 md:w-[400px] font-sans font-light text-gray1 text-sm">
          <span class="font-bold"> Content Laundering </span> /ˈkɒntent lɔːndərɪŋ/  <span class="text-xs"> noun </span><br/><span class="font-normal">a strategic form of communication that disguises the origins of the content.</span>
        <p>
      </div>
    </div>
    <div class="w-full min-h-autot md:w-auto md:min-h-[500px] flex justify-center items-center">
      <Tabs value="content similarity" class="self-start w-full md:w-3/4 outline outline-gray5 outline-[1px] shadow-xl rounded-md" let:C>
        <C.List>
          <C.Trigger value="content similarity" class="rounded-tl-md">Content Similarity
</C.Trigger>
          <C.Trigger value="technical similarity" class="rounded-tr-md">Technical Similarity</C.Trigger>
        </C.List>
        <C.Content value="content similarity">
          <P>
          Enter a website URL or snippet of text to analyse content similarity. Check the search engines you want to use to power the search results.
          </P>
          {#if contentBasicFormConfig}
            <Form config={contentBasicFormConfig} onSubmit={handleSubmit} orientation={FormOrientation.Horizontal}/>
          {/if}
        </C.Content>
        <C.Content value="technical similarity">
          <P>
          Analysing technical relationships of a website with media websites in the corpus, including eg. state run media, fake news websites and Wikidata's list of news websites. For a full list see here.
          <br/>
          <br/>
          Potential use-cases include:  understand sister sites, discover ad networks or analyse DNS ban circumvention practices.
          <br/>
          <br/>
          Enter a URL, the Laundromat will look for similarities with other entries in the database based on metadata overlap.
           </P>
          {#if metadataFormConfig}
            <Form config={metadataFormConfig} onSubmit={handleSubmit} orientation={FormOrientation.Horizontal}/>
          {/if}
        </C.Content>
      </Tabs>
    </div>
  </div>
  <div class="mt-10 md:mt-20">
    <ul id="use case list" class="grid grid-cols-1 md:grid-cols-3 gap-x-10 ">
      <li class="">
        <H2 class="pb-4">
          Prove content laundering from state-owned outlets
        </H2>
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
        <H2 class="pb-4">
          Find proxy websites that exist to overcome DNS bans
        </H2>
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
