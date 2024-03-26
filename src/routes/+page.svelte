<script lang="ts">
  import { goto } from '$app/navigation';
  import Tabs from '$components/Tabs.svelte';
  import Form from '$components/Form.svelte';
  import Label from '$components/Label.svelte';
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
  import { contentStore, urlContentStore, metadataStore } from '$stores/apiData.ts';
  export let data;

  async function handleSubmit(event: Event, query: { type: QueryType; endpoint: Endpoint }) {
    event.preventDefault();
    loadingStore.set(true);
    const target = event.target as HTMLFormElement;
    let formData = new FormData(target);

     if (query.endpoint === Endpoint.ParseUrl || query.endpoint === Endpoint.Content 
         && !formData.has('combineOperator')) {
        formData.set('combineOperator', 'OR');
      } else if (query.endpoint === Endpoint.Fingerprint && !formData.has('run_urlscan')) {
      formData.set('run_urlscan', '0');
    }

    const response: ApiResponse<ApiContentData | ApiFingerprintData> = await queryApi(
      query.type,
      query.endpoint,
      formData
    );

    if (response.error) {
    } else {
      if (response.data) {
        if (query.endpoint === Endpoint.ParseUrl) {
          urlContentStore.set(response.data as ApiContentData);
          goto('/search/url');
        } else if (query.endpoint === Endpoint.Content) {
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
  $: urlFormConfig = data.urlFormConfig;
  $: contentFormConfig = data.contentFormConfig;
  $: metadataFormConfig = data.metadataFormConfig;
</script>

<section class="grid grid-rows-2 px-3 md:px-8">
  <div class=" grid grid-cols-1 gap-4 md:grid-cols-2">
    <div class="w-100 flex items-center justify-center justify-items-center">
      <h1 class="w-[400px] font-sans text-5xl font-light text-black dark:text-white">
        Discover content relationships from across the infosphere
      </h1>
    </div>
    <div class="min-h-[500px] flex justify-center items-center">
      <Tabs value="content similarity" class="w-3/4 outline outline-gray5 outline-[1px] shadow-xl rounded-md" let:C>
        <C.List>
          <C.Trigger value="content similarity" class="rounded-tl-md">Content similarity</C.Trigger>
          <C.Trigger value="metadata similarity" class="rounded-tr-md">Metadata similarity</C.Trigger>
        </C.List>
        <C.Content value="content similarity">
          <P>
            Search for similar content shared across the internet. Laundromat uses popular search
            engines to find related websites. Discover networks of malicious actors/websites
            collectively sharing disinformation.
          </P>
          {#if urlFormConfig}
            <Form config={urlFormConfig} onSubmit={handleSubmit} orientation={FormOrientation.Horizontal}/>
          {/if}
        </C.Content>
        <C.Content value="url similarity">
          <P>
            Search for similar content shared across the internet. Laundromat uses popular search;
           </P>
          {#if contentFormConfig}
            <Form config={contentFormConfig} onSubmit={handleSubmit} orientation={FormOrientation.Horizontal}/>
          {/if}
        </C.Content>
        <C.Content value="metadata similarity">
          <P>
            Search for similar content shared across the internet. Laundromat uses popular search;
           </P>
          {#if metadataFormConfig}
            <Form config={metadataFormConfig} onSubmit={handleSubmit} orientation={FormOrientation.Horizontal}/>
          {/if}
        </C.Content>
      </Tabs>
    </div>
  </div>
  <div>
    <ul id="use case list" class="grid grid-cols-1 gap-x-4 md:grid-cols-3">
      <li class="pr-5">
        <H2 class="">
          Prove content laundering from state-owned outlets
        </H2>
        <P class=" font-sans text-sm font-light">
          Researchers from two European Universities, supported by the Alliance for Securing
          Democracy, reveal evidence of a small network operating in Poland and Germany that
          launders Russian state media content into the media mainstream. A sample of articles from
          problematic outlets, criticizing Ukraine President Zelensky was run through the
          Laundromat’s Content Search. The tool revealed that all the articles in the sample were
          lifted from Ria Novosti, an outlet belonging to the Russia Segodnya group. Read the
          report.
        </P>
      </li>
      <li class="pr-5">
        <H2 class="">
          Find proxy websites that exist to overcome DNS bans
        </H2>
        <P class="font-sans text-sm font-light">
          Both Russia Today and Sputnik News sites are currently subjected to DNS bans imposed by
          the European Commission. However, despite these restrictions, each site employf
          sophisticated techniques to reach audiences in Member Countries. Read the report to learn
          how researchers were able to utilize the Laundromat's website fingerprinting service to
          map the entire network of Russia Today proxy websites, using altered or entirely new
          domain names.
        </P>
      </li>
      <li class="font-sans text-black dark:text-white">
        <H2 class="">Tell if a site produces original content</H2>
        <P class="font-sans text-sm font-light">
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
