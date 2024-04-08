<script lang="ts">
  import H1 from '$components/H1.svelte';
  import H2 from '$components/H2.svelte';
  import H3 from '$components/H3.svelte';
  import H4 from '$components/H4.svelte';
  import H5 from '$components/H5.svelte';
  import P from '$components/P.svelte';
  import Link from '$components/Link.svelte';
</script>

<div class="my-6 w-full px-3 md:w-1/3 md:px-8">
  <H1 class="pb-4" id="about-the-indicator-tier-system-and-interpreting-results">
    About the Indicator Tier System and Interpreting Results
  </H1>

  <P class="pb-2">
    Each indicator is associated with evidentiary tier and are subject to <Link
      href="#Interpreting Indicator Validity">interpretation</Link
    >.
  </P>
  <P>
    Tier 1 indicators: <Link href="#Interpreting Indicator Validity"
      ><strong>WHEN VALID</strong></Link
    >
    are typically unique or highly indicative of the provenance of a website. This includes unique IDs
    for verification purposes and web services like Google, Yandex, etc as well as site metadata like
    WHOIS information and certification,
    <Link href="#Interpreting Indicator Validity"><strong>WHEN VALID</strong></Link>, as DDOS
    protection services like Cloudflare and shared hosting services like Bluehost can provide
    spurious matches.
  </P>
  <P>
    Tier 2 indicators: Tier 2 indicators, <Link href="#Interpreting Indicator Validity"
      ><strong>WHEN VALID</strong></Link
    >, offer a moderate level of certainty regarding the provenance of a website. These are not as
    unique as Tier 1 indicators but provide valuable context. This tier includes IPs within the same
    subnet, matching meta tags, and commonalities in standard and custom response headers
  </P>
  <P>
    Tier 3: Tertiary Indicators Tier 3 indicators, <Link href="#Interpreting Indicator Validity"
      ><strong>WHEN VALID</strong></Link
    >, are the least specific but can still support broader analyses when combined with higher-tier
    indicators. These include shared CSS classes, UUIDs, and Content Management Systems
  </P>
  <H4 id="interpreting-indicator-validity">Interpreting Indicator Validity</H4>
  <P>
    Understanding the validity of indicators is crucial in the analysis of websites&#39; provenance
    and connections. Indicators can range from high-confidence markers of direct relationships to
    spurious matches that may mislead investigations. It is essential to approach each indicator
    with a critical eye and corroborate findings with additional evidence.
  </P>
  <P><strong>High Confidence Indicators:</strong></P>
  <ul class="list-inside list-disc">
    <li class="text-black dark:text-white">
      <P class="inline">
        Unique IDs for verification purposes: These are often excellent evidence of a connection or
        shared ownership, such as unique Google Analytics IDs that directly link websites to the
        same account.
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        Domain Certificate sharing: When websites share a specific SSL certificate, it often (but
        not always, see below) indicates a direct relationship, as certificates are typically issued
        to and managed by the same entity.
      </P>
    </li>
  </ul>
  <P>
    Discovering two websites with the same unique Google Analytics ID AND a shared, specific SSL
    certificate suggests a high-confidence link, indicating shared management or ownership.
  </P>
  <P><strong>Spurious Matches:</strong></P>
  <ul class="list-inside list-disc">
    <li class="text-black dark:text-white">
      <P class="inline">
        Using services like Cloudflare: While Cloudflare and similar DDOS protection services offer
        valuable security benefits, they also mask true IP addresses and distribute shared SSL
        certificates across multiple sites. This can lead to false positives in linking unrelated
        websites based on shared IP addresses or certificates.
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
  <P>
    Identifying that multiple websites are behind Cloudflare does not inherently indicate a
    connection beyond choosing a common, popular service for performance and security enhancements.
    All tier 1 and 2 indicators should be scrutinized carefully to determine if a match is valid or
    spurious
  </P>
  <H2 id="full-indicators-list-">Full Indicators List:</H2>
  <ul class="list-inside list-disc">
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-cert-domain - Domain Certificate</strong>: An SSL certificate is a digital
        certificate that authenticates a website&#39;s or multiple websites&#39; identity and
        enables an encrypted connection.
        <em
          >A shared certificate between two sites is strong evidence of a link between sites, as
          typically a certificate must be issued for all those sites at once by a single entity and
          cannot easily be spoofed. However, some web hosting and DDOS protection services bundle
          certificates for unrelated sites, so carefully research any matches.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-crypto-wallet - Cryptocurrency Wallet</strong>: A digital wallet used to store,
        send, and receive cryptocurrencies like Bitcoin and Ethereum.
        <em
          >The presence of a cryptocurrency wallet address can link a site or an individual to
          cryptocurrency transactions, potentially indicating financial sources or preferences.
          However, due to the pseudonymous nature of such wallets, additional information is
          required to definitively establish ownership or connections.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-domain - Domain Name</strong>: The unique name that identifies a website, which is
        registered in the Domain Name System (DNS).
        <em
          >The domain name can provide insights into the nature or origin of a website.
          Commonalities in domain names may suggest shared affiliations or intents. However, the
          ease of registering domain names requires careful analysis to avoid false associations.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-domain_suffix - Domain Suffix</strong>: The last part of a domain name, typically
        representing a category or country code.
        <em
          >A domain suffix can indicate the intended audience or origin of a website. Similar
          suffixes across different sites might suggest a geographical or organizational link. Yet,
          the global accessibility of most suffixes means this should not be a sole determinant of
          connection.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-fb_pixel_id - Facebook Pixel ID</strong>: A unique identifier for the Facebook
        Pixel, an analytics tool that allows website owners to measure the effectiveness of their
        advertising by understanding the actions people take on their website.
        <em
          >Shared Facebook Pixel IDs across sites can indicate common ownership or a shared
          marketing strategy. However, third-party marketing agencies might use the same ID across
          different clients, potentially leading to mistaken connections.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-adobe_analytics_id - Adobe Analytics ID</strong>: A unique identifier used by
        Adobe Analytics, a tool for analyzing visitor traffic on websites.
        <em
          >Similar to other analytics tools, shared Adobe Analytics IDs can hint at common
          management or partnerships between websites. However, as with Facebook Pixel IDs, the use
          of analytics IDs by third-party services may introduce unrelated links.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-sitemap_entries - Sitemap Entries</strong>: Entries in a website&#39;s sitemap,
        which is an XML file listing the URLs for a site along with additional metadata about each
        URL.
        <em
          >Analysis of sitemap entries can reveal the structure and content priorities of a website.
          Commonalities in sitemap structures or content might suggest shared authorship or
          objectives. However, similarities could also result from common website templates or
          platforms.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-ipms_domain_iprangeowner_cidr - IP Range Owner CIDR</strong>: The Classless
        Inter-Domain Routing (CIDR) notation indicating the range of IP addresses owned by an
        entity.
        <em
          >CIDR data can help identify the network scope and location of a domain&#39;s hosting.
          Shared IP ranges might suggest hosting or service provider commonalities. However, large
          hosting providers may have numerous unrelated clients within the same range.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-ipms_domain_iprangeowner_ownerName - IP Range Owner Name</strong>: The name of the
        entity owning a range of IP addresses.
        <em
          >This information can be used to identify the hosting provider or organization controlling
          a set of IP addresses. Shared ownership names might indicate a relationship between the
          entities using those IPs, though large organizations often host unrelated entities.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-ipms_domain_iprangeowner_address - IP Range Owner Address</strong>: Physical
        address of the entity owning a range of IP addresses.
        <em
          >Physical addresses can provide geographical and organizational context. Shared addresses
          across different IP ranges might suggest a close relationship or common management.
          However, the presence of data centers and shared office spaces can result in address
          overlaps for unrelated entities.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-ipms_domain_nameserver - Domain Name Server</strong>: A server that translates
        domain names into IP addresses, facilitating the connection between a user&#39;s device and
        the website&#39;s server.
        <em
          >Common nameservers among different domains might indicate shared hosting or management
          services. However, popular hosting providers serve a large number of clients, potentially
          leading to false associations.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-ipms_domain_otheripused - Other IPs Used by Domain</strong>: A list of IP
        addresses that have been used by a domain, aside from its primary IP address.
        <em
          >This data can reveal the network history and changes in hosting of a domain. Shared
          historical IPs might suggest past commonalities or transitions in hosting services.
          However, dynamic IP allocation by hosting services can result in unrelated sites
          temporarily sharing IPs.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-ipms_siteonthisip_now - Current Sites on This IP</strong>: Websites currently
        hosted on the same IP address.
        <em
          >Websites sharing an IP address may have a relationship, such as being part of the same
          network or organization. However, shared hosting environments can lead to unrelated
          websites being hosted on the same IP.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-ipms_siteonthisip_before - Former Sites on This IP</strong>: Websites that were
        previously hosted on the same IP address but are no longer.
        <em
          >Historical data on IP hosting can provide insights into the network associations and
          changes over time. Formerly shared IPs might indicate previous relationships or common
          hosting decisions. However, dynamic IP allocations can lead to brief and incidental
          overlaps.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-ipms_siteonthisip_broken - Broken Sites on This IP</strong>: Websites hosted on
        the same IP address that are currently not functional or accessible.
        <em
          >Identifying non-functional sites on a shared IP can indicate network health or hosting
          issues. Patterns in broken sites might suggest targeted disruptions or poor hosting
          services. However, temporary technical issues can also cause sites to be non-functional,
          unrelated to their network neighbors.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-ipms_useragents - User Agents</strong>: Strings that web browsers and other client
        devices send to identify themselves to web servers, typically containing information about
        the device and browser.
        <em
          >Analysis of user agents can reveal the types of devices and browsers most frequently
          accessing a site, potentially indicating the site&#39;s target audience or technological
          preferences. However, the widespread use of common browsers can limit the specificity of
          these insights.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-ip_shodan_hostnames - Shodan Hostnames</strong>: Hostnames associated with an IP
        address as indexed by Shodan, a search engine for internet-connected devices.
        <em
          >Shodan&#39;s data can reveal the various services and hostnames associated with an IP,
          potentially indicating its use and ownership. Shared hostnames across IPs might suggest
          network or organizational links. However, the dynamic nature of IP allocations can lead to
          transient or outdated hostname associations.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-ip_shodan_ports - Shodan Ports</strong>: Open network ports on an IP address as
        detected by Shodan.
        <em
          >Open ports can indicate the types of services an IP is offering, with certain ports
          associated with specific applications or protocols. Common ports across different IPs
          might suggest similar uses or configurations. However, standard port uses can be
          widespread and not necessarily indicative of direct relationships.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>2-ip_shodan_vuln - Shodan Vulnerabilities</strong>: Vulnerabilities identified on an
        IP address by Shodan, based on open ports and services.
        <em
          >Identifying vulnerabilities can help assess the security posture of a network or device.
          Shared vulnerabilities might indicate common software or configuration weaknesses.
          However, widespread vulnerabilities in popular software can appear across unrelated
          networks.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-ip_shodan_cpe - Shodan CPE</strong>: Common Platform Enumeration (CPE) identifiers
        found by Shodan, indicating specific software or hardware on an IP.
        <em
          >CPE identifiers can provide detailed insights into the technological stack of a network
          or device. Shared CPEs might suggest technological commonalities or shared suppliers.
          However, the ubiquity of certain technologies can lead to coincidental overlaps.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-ga_id - Google Analytics ID</strong>: A unique identifier associated with Google
        Analytics, used for tracking and analyzing website traffic.
        <em
          >Like other analytics IDs, shared Google Analytics IDs across websites may indicate common
          ownership or marketing strategies. However, the use of third-party marketing agencies can
          result in the same ID being used across unrelated sites.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-ga_tag_id - Google Analytics Tag ID</strong>: A unique tag identifier used in
        Google Analytics for tracking specific user interactions on a website.
        <em
          >Similar to the general Google Analytics ID, shared tag IDs might suggest a connection
          between sites, especially in how they track user behavior. However, similar tracking
          strategies might also be independently adopted by unrelated sites.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-ip - IP Address</strong>: A unique numerical label assigned to each device
        connected to a computer network that uses the Internet Protocol for communication.
        <em
          >An IP address can reveal the geographic location and network provider of a device or
          website. Shared IPs may indicate shared hosting or network resources. However, dynamic IP
          allocation and large hosting environments can lead to incidental sharing.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-verification_id - Verification ID</strong>: A unique identifier used for verifying
        ownership or authenticity of a website or online account.
        <em
          >Verification IDs can establish the legitimacy of a site or account, potentially linking
          it to a specific owner or organization. However, verification processes vary, and IDs can
          be reassigned or spoofed, requiring careful verification.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>1-yandex_tag_id - Yandex Tag ID</strong>: A unique identifier used by Yandex
        Metrica, a tool for analyzing visitor traffic, similar to Google Analytics.
        <em
          >Shared Yandex Tag IDs could suggest common ownership or similar web analytics strategies
          between sites. However, like other analytics tools, the involvement of third-party
          services can create misleading connections.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>2-subnet - Subnet</strong>: A segment of a network&#39;s IP address range that can
        be designated to optimize performance and security.
        <em
          >Subnet information can indicate how a network is structured and segmented for various
          purposes. Shared subnets between different entities might suggest a relationship or common
          network management. However, subnets are often allocated by ISPs or hosting providers to
          multiple clients.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-cdn-domain - CDN Domain</strong>: A domain used by a Content Delivery Network
        (CDN) to deliver content efficiently across the internet.
        <em
          >Shared CDN domains can indicate that websites are utilizing the same CDN provider for
          content distribution, which might imply performance or operational preferences. However,
          popular CDNs are used by a wide range of websites, limiting the value of this data for
          establishing direct connections.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-cms - Content Management System</strong>: A software application or set of related
        programs used to create and manage digital content.
        <em
          >Common CMS platforms among different websites might suggest similar operational needs or
          preferences. However, widely-used CMS platforms like WordPress are employed by a diverse
          array of sites, often without any direct relation.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-css_classes - CSS Classes</strong>: Classes defined in Cascading Style Sheets
        (CSS) to style and format the layout of web pages.
        <em
          >Analysis of CSS classes can provide insights into the design and development approaches
          of a website. Shared classes might suggest common design templates or developers. However,
          common frameworks and libraries can lead to similar CSS classes across unrelated sites.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-header-nonstd-value - Non-Standard Header Value</strong>: Values in HTTP headers
        that do not conform to standard header formats, potentially indicating custom configurations
        or software.
        <em
          >Non-standard header values can be unique identifiers of custom configurations or software
          used by a website. Shared non-standard values might indicate common development practices
          or software choices. However, the interpretation of these values requires technical
          expertise to avoid misattribution.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-header-server - Server Header</strong>: The &#39;Server&#39; HTTP header field
        that specifies information about the software used by the origin server.
        <em
          >The server header can reveal the web server software and its configuration. Shared server
          headers might indicate similar technological choices or configurations. However, popular
          server software like Apache and Nginx is widely used, so this data alone is not sufficient
          to establish a connection.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-id_tags - ID Tags</strong>: Unique identifiers used in the HTML code of a website
        to distinguish specific elements.
        <em
          >Similar ID tags across websites might suggest shared development practices or template
          usage. However, common ID tags can also be a result of widespread frameworks or libraries,
          and thus, might not be indicative of direct relationships.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-iframe_id_tags - Iframe ID Tags</strong>: Unique identifiers used for
        &#39;iframe&#39; elements in HTML, allowing the embedding of an external webpage within a
        webpage.
        <em
          >Shared Iframe ID tags could indicate similar website functionalities or content sharing
          strategies. However, common frameworks or website templates can lead to the usage of
          similar Iframe IDs across different websites, reducing the significance of this
          correlation.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-link_href - Link Href Attributes</strong>: The &#39;href&#39; attribute of a link
        in HTML, specifying the URL of the page the link goes to.
        <em
          >Analysis of &#39;href&#39; attributes can reveal the external connections or references a
          website makes. Shared &#39;href&#39; attributes across different sites might suggest
          common affiliations or sources. However, links to popular or general websites might not be
          indicative of a direct relationship.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-meta_generic - Generic Meta Tags</strong>: Meta tags in HTML that provide general
        information about a webpage, such as description, keywords, and author.
        <em
          >Common meta tags can indicate similar content or objectives. However, generic or broadly
          used tags may appear in a wide range of websites, potentially leading to mistaken
          connections.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-meta_social - Social Media Meta Tags</strong>: Meta tags specifically designed for
        optimizing social media sharing, defining how content appears when shared on social
        platforms.
        <em
          >Shared social media meta tags might suggest a coordinated approach to social media
          engagement or content strategy. However, the use of standard social media optimization
          practices can lead to similar tags across unrelated sites.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-script_src - Script Source Attributes</strong>: The &#39;src&#39; attribute of a
        script tag in HTML, indicating the source of a JavaScript file.
        <em
          >Shared script sources can point to the use of common libraries or external scripts.
          However, the widespread use of popular JavaScript libraries and scripts might lead to
          coincidental similarities.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-uuid - UUID</strong>: Universally Unique Identifier, a 128-bit number used to
        identify information in computer systems.
        <em
          >UUIDs can be used to track and manage assets or components within a system. Shared UUIDs
          might indicate a connection between different systems or components. However, the nature
          of UUIDs as unique identifiers typically limits the occurrence of shared UUIDs across
          unrelated systems.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-whois_creation_date - WHOIS Creation Date</strong>: The date a domain name was
        first registered, as recorded in the WHOIS database.
        <em
          >Similar creation dates for domains might suggest a coordinated launch or common origin.
          However, coincidental registration dates are possible, especially during popular events or
          domain sales.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-whois_server - WHOIS Server</strong>: The server that provides the WHOIS
        information, containing details about domain name registrations.
        <em
          >Use of the same WHOIS server for different domains could indicate a preference for
          certain domain registrars. However, popular registrars serve a large number of clients, so
          this alone isn&#39;t a strong indicator of a relationship.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-whois-registrar - WHOIS Registrar</strong>: The organization authorized to
        register and manage domain names for a particular top-level domain.
        <em
          >Domains registered through the same registrar might have some administrative
          commonalities. However, given the market dominance of certain registrars, this is not a
          definitive sign of a direct connection between domain owners.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-wp-blocks - WordPress Blocks</strong>: Content blocks used in WordPress to build
        and design webpages.
        <em
          >Shared WordPress blocks could indicate similar website designs or use of common
          templates. However, due to the popularity of WordPress and its wide range of available
          blocks, similarities might occur coincidentally.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-wp-categories - WordPress Categories</strong>: Categorization system in WordPress
        used to group content into different sections.
        <em
          >Similar categories in different WordPress sites might suggest related content or thematic
          similarities. However, common categories are widely used across various sites, potentially
          leading to non-significant matches.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-wp-pages - WordPress Pages</strong>: Web pages created and managed within the
        WordPress platform.
        <em
          >Analysis of WordPress pages can reveal the structure and content emphasis of a site.
          Shared page structures or content might suggest a common template or designer. However,
          the extensive use of WordPress templates can lead to similar page structures across
          unrelated sites.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-wp-posts - WordPress Posts</strong>: Blog posts or articles published on a
        WordPress website.
        <em
          >Shared themes or styles in WordPress posts might indicate similar content strategies or
          sources. However, the widespread use of WordPress for blogging and content creation means
          that thematic overlaps are common and not necessarily indicative of a connection.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-wp-tags - WordPress Tags</strong>: Tagging system in WordPress used to describe
        specific details of posts, aiding in content organization and navigation.
        <em
          >Common tags across WordPress sites might suggest related topics or a shared content
          approach. However, popular tags are frequently used across diverse websites, diminishing
          the potential for meaningful connections.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>3-wp-users - WordPress Users</strong>: Individual accounts within WordPress that
        have various roles and permissions for managing website content.
        <em
          >Shared user accounts or roles across WordPress sites might imply common administration or
          authorship. However, generic user roles such as &#39;administrator&#39; or
          &#39;editor&#39; are common and not uniquely identifying.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>2-urlscan_globalvariable - URLScan Global Variable</strong>: Global JavaScript
        variables identified by URLScan, a tool for scanning and analyzing websites.
        <em
          >Shared global variables might indicate the use of similar scripts or frameworks. However,
          common JavaScript practices and libraries can result in widespread use of the same global
          variables across different websites.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>2-urlscan_cookies - URLScan Cookies</strong>: Cookies identified by URLScan as being
        set by websites during a scan.
        <em
          >Analysis of cookies can reveal tracking, personalization, or functional aspects of a
          website. Shared cookies across sites might suggest shared tracking or management tools.
          However, common third-party services, like analytics or advertising platforms, often set
          similar cookies across various websites.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>2-urlscan_consolemessages - URLScan Console Messages</strong>: Messages output to
        the browser console during a website scan by URLScan.
        <em
          >Console messages can provide insights into the website&#39;s functionality or potential
          issues. Common messages across different scans might indicate similar development
          practices or shared issues. However, these messages can also be generated by common
          frameworks or browser extensions.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>2-urlscan_asn - URLScan Autonomous System Number</strong>: The Autonomous System
        Number (ASN) identified by URLScan, representing the collection of IP networks and routers
        under the control of one entity.
        <em
          >Shared ASNs can suggest that websites are part of the same network or hosted by the same
          provider. However, large hosting providers and ISPs control extensive ASNs that encompass
          a wide range of clients.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>2-urlscan_domainsonpage - URLScan Domains on Page</strong>: A list of all domains
        found on a webpage during a URLScan.
        <em
          >Domains listed on a page can reveal external links or embedded content. Shared domains
          across different webpages might suggest common affiliations or sources. However, widely
          used domains, such as social media or analytics platforms, are commonly found across
          numerous sites.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>2-urlscan_urlssonpage - URLScan URLs on Page</strong>: All URLs found on a webpage
        during a URLScan.
        <em
          >The presence of specific URLs can indicate the nature of the content or the external
          connections of a website. Shared URLs across different pages might suggest a relationship
          or common sources. However, links to popular websites or resources might not be uniquely
          significant.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>2-urlscanhrefs - URLScan Hrefs</strong>: Hypertext references (hrefs) identified on
        webpages during a URLScan.
        <em
          >Href attributes can provide insights into the external links and relationships of a
          website. Common hrefs across different sites might suggest shared affiliations or content.
          However, links to widely used resources or platforms can appear across many sites,
          limiting the potential for direct connection inference.</em
        >
      </P>
    </li>
    <li class="text-black dark:text-white">
      <P class="inline">
        <strong>2-techstack - Technology Stack</strong>: The set of technologies used to build and
        run a website or application, including frameworks, languages, and software.
        <em
          >Similar technology stacks can suggest shared development practices or preferences.
          However, certain technology combinations are widely popular and may be used by a vast
          range of unrelated websites or applications.</em
        >
      </P>
    </li>
  </ul>
</div>
