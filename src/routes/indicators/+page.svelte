<script lang="ts">
  import H1 from '$components/H1.svelte';
  import H2 from '$components/H2.svelte';
  import H3 from '$components/H3.svelte';
  import H4 from '$components/H4.svelte';
  import H5 from '$components/H5.svelte';
  import P from '$components/P.svelte';
  import Link from '$components/Link.svelte';
  import type { ApiIndicatorsData } from '$models';
  export let data;
  let indicator_metadata: Pick<ApiIndicatorsData, 'indicator_metadata'>;
  $: indicator_metadata = data.indicator.indicator_metadata;
</script>

<div class="my-6 w-full px-3 md:w-1/3 md:px-8">
  <H1 id="about-the-indicator-tier-system-and-interpreting-results">
    About the Indicator Tier System and Interpreting Results
  </H1>
  <section class="pt-8">
    <P class="pb-2">
      Each indicator is associated with evidentiary tier and are subject to <Link
        href="#interpreting-indicator-validity">interpretation</Link
      >.
    </P>
    <H4 class="pb-2">Tier 1: Conclusive Indicators</H4>
    <P lass="pb-2">
      <Link href="#interpreting-indicator-validity"><strong>WHEN VALID</strong></Link>
      are typically unique or highly indicative of the provenance of a website. This includes unique
      IDs for verification purposes and web services like Google, Yandex, etc as well as site metadata
      like WHOIS information and certification,
      <Link href="#interpreting-indicator-validity"><strong>WHEN VALID</strong></Link>, as DDOS
      protection services like Cloudflare and shared hosting services like Bluehost can provide
      spurious matches.
    </P>

    <H4 class="py-2">Tier 2: Associative Indicators</H4>
    <P class="pb-2">
      <Link href="#interpreting-indicator-validity"><strong>WHEN VALID</strong></Link>, offer a
      moderate level of certainty regarding the provenance of a website. These are not as unique as
      Tier 1 indicators but provide valuable context. This tier includes IPs within the same subnet,
      matching meta tags, and commonalities in standard and custom response headers
    </P>

    <H4 class="py-2">Tier 3: Tertiary Indicators</H4>
    <P class="pb-2">
      <Link href="#interpreting-indicator-validity"><strong>WHEN VALID</strong></Link>, are the
      least specific but can still support broader analyses when combined with higher-tier
      indicators. These include shared CSS classes, UUIDs, and Content Management Systems
    </P>
  </section>

  <section class="pt-8">
    <H3 class="pb-4" id="interpreting-indicator-validity">Interpreting Indicator Validity</H3>
    <P class="pb-2">
      Understanding the validity of indicators is crucial in the analysis of websites&#39;
      provenance and connections. Indicators can range from high-confidence markers of direct
      relationships to spurious matches that may mislead investigations. It is essential to approach
      each indicator with a critical eye and corroborate findings with additional evidence.
    </P>
    <P class="pb-2"><strong>High Confidence Indicators:</strong></P>
    <ul class="list-inside list-disc">
      <li class="text-black dark:text-white">
        <P class="inline">
          Unique IDs for verification purposes: These are often excellent evidence of a connection
          or shared ownership, such as unique Google Analytics IDs that directly link websites to
          the same account.
        </P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">
          Domain Certificate sharing: When websites share a specific SSL certificate, it often (but
          not always, see below) indicates a direct relationship, as certificates are typically
          issued to and managed by the same entity.
        </P>
      </li>
    </ul>
    <P class="pb-2">
      Discovering two websites with the same unique Google Analytics ID AND a shared, specific SSL
      certificate suggests a high-confidence link, indicating shared management or ownership.
    </P>
    <P class="pb-2"><strong>Spurious Matches:</strong></P>
    <ul class="list-inside list-disc">
      <li class="text-black dark:text-white">
        <P class="inline">
          Using services like Cloudflare: While Cloudflare and similar DDOS protection services
          offer valuable security benefits, they also mask true IP addresses and distribute shared
          SSL certificates across multiple sites. This can lead to false positives in linking
          unrelated websites based on shared IP addresses or certificates.
        </P>
      </li>
      <li class="text-black dark:text-white">
        <P class="inline">
          Shared hosting services: Websites hosted on shared services like Bluehost may share IP
          addresses with hundreds of unrelated sites, making IP-based matches unreliable without
          further context.
        </P>
      </li>
    </ul>
    <P class="pb-2">
      Identifying that multiple websites are behind Cloudflare does not inherently indicate a
      connection beyond choosing a common, popular service for performance and security
      enhancements. All tier 1 and 2 indicators should be scrutinized carefully to determine if a
      match is valid or spurious
    </P>
    <H5 id="example-investigation-">Example Investigation:</H5>
    <P class="pb-2">
      An analyst investigating a network of disinformation websites notices that several sites share
      a specific Facebook Pixel ID, indicating a potential link in their online marketing
      strategies. This Tier 1 indicator suggests a high-confidence connection. However, upon further
      investigation, it&#39;s revealed that these sites also use Cloudflare for DDOS protection,
      sharing SSL certificates and IP addresses with numerous unrelated sites. While the shared
      Facebook Pixel ID remains a strong indicator of connection, the shared certificates and IP
      addresses through Cloudflare are deemed spurious matches and the additional sites are
      discarded from the network. The analyst corroborates the initial finding with additional Tier
      1 indicators, such as unique verification IDs, solidifying the connection between the sites
      beyond the spurious matches introduced by shared security services.
    </P>
    <P class="pb-2">
      In interpreting indicator validity, analysts must weigh the evidence, seek corroboration, and
      consider the broader context to distinguish between high-confidence connections and
      potentially misleading, spurious matches.
    </P>
  </section>

  <section class="pt-8">
    <H2 id="full-indicators-list-">Full Indicators List</H2>
    {#if indicator_metadata}
      <ul>
        {#each Object.entries(indicator_metadata) as [key, data]}
          <li class="py-3">
            <H4 id={data.name}>{data.name}</H4>
            <span class="block pb-3 font-sans text-sm text-gray1"> {key}</span>
            <P class="inline">
              {data.description}
              <br />
              {data.interpretation}
            </P>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</div>
