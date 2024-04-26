import type { TableHeaderItemData, NavItemData, LabeledValue, InputConfig, DomainAssociation} from '$models';
import { RemoteConfigFlag, Endpoint, QueryType } from '$models';

import { InputType, TableHeaderItemType } from '$models';

export const APP_TITLE: string = 'The Information Laundromat';
export const API_URL: string = 'https://www.informationlaundromat.com/api/';

export const TABLE_CONTENT_SEARCH_HEADER: TableHeaderItemData[] = [
  { label: 'Content Domain', key: 'domain', type: TableHeaderItemType.String },
  { label: 'Similarity Score', key: 'score', type: TableHeaderItemType.Number },
  { label: 'Similar Content', key: 'snippet', tooltip: '', type: TableHeaderItemType.String }
];
export const TABLE_CONTENT_SEARCH_MAIN_ROW: TableHeaderItemData[] = [
  { label: 'Content Domain', key: 'domain', type: TableHeaderItemType.String },
  { label: 'Similarity Score', key: 'score', type: TableHeaderItemType.Number },
  { label: 'Similar Content', key: 'snippet', tooltip: '', type: TableHeaderItemType.String }
];
export const TABLE_CONTENT_SEARCH_MAIN_ROW_KEYS: string[] = TABLE_CONTENT_SEARCH_MAIN_ROW.map(
  (item) => item.key
);

export const TABLE_CONTENT_SEARCH_COMPLEMENTARY_ROW: TableHeaderItemData[] = [
  { label: 'Similar Content', key: 'snippet', tooltip: '', type: TableHeaderItemType.String },
  { label: 'Content Title', key: 'title', tooltip: '', type: TableHeaderItemType.String },
  { label: 'Domain count', key: 'domain_count', tooltip: '', type: TableHeaderItemType.Number },
  { label: 'Link count', key: 'link_count', tooltip: '', type: TableHeaderItemType.String },
  { label: 'Search engines', key: 'engines', type: TableHeaderItemType.String },
  { label: 'Content URL', key: 'url', type: TableHeaderItemType.Url }
];
export const TABLE_CONTENT_SEARCH_COMPLEMENTARY_ROW_KEYS: string[] =
  TABLE_CONTENT_SEARCH_COMPLEMENTARY_ROW.map((item) => item.key);

export const TABLE_METADATA_HEADER: TableHeaderItemData[] = [
  { label: 'Content Domain', key: 'domain', type: TableHeaderItemType.String },
  { label: 'Indicators', key: 'indicators_summary', type: TableHeaderItemType.IndicatorsSummary },

  { label: '', key: '', type: TableHeaderItemType.Empty }
];

export const UI_NAV: NavItemData[] = [
  { label: 'Workspace', path: '/search/content' },
  { label: 'About', path: '/about' },
  { label: 'Indicators', path: '/indicators' }
  //{ label: 'Log in | Sign up', path: '/login' }
];

export const UI_SEARCH_NAV: NavItemData[] = [
  { label: 'Content Similarity', path: '/search/content' },
  { label: 'Technical Similarity', path: '/search/metadata' }
];

// WIP this should be hardcoded in the Combine component
export const operator_data: LabeledValue[] = [
  { label: 'AND', value: 'AND' },
  { label: 'OR', value: 'OR' }
];

export const CONTENT_SIMILARITY_BASIC_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.TextArea,
    name: 'contentToSearch',
    label: 'Content',
    placeholder: 'Enter an article URL or snippet of text',
    required: true,
    submitQuery: {
      type: QueryType.Post,
      endpoint: Endpoint.Content,
      route: '/search/content/'
    }
  },
  {
    type: InputType.Dropdown,
    name: 'language',
    label: 'Language of search results',
    placeholder: 'Select Language',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigFlag.Languages
  },
  {
    type: InputType.CheckboxGroup,
    name: 'search_engines',
    label: 'Search engines',
    placeholder: 'Select search engines',
    variant: 'horizontal',
    required: true,
    data: undefined,
    checked: ['google'],
    requiresRemoteData: RemoteConfigFlag.Engines
  },
  {
    type: InputType.Hidden,
    name: 'country',
    value: undefined,
    requiresRemoteData: RemoteConfigFlag.Countries
  },
  {
    type: InputType.Hidden,
    name: 'isApi',
    value: true
  }
];

export const CONTENT_SIMILARITY_ADVANCED_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.TextArea,
    name: 'contentToSearch',
    label: 'Content',
    placeholder: 'Enter an article URL or snippet of text',
    required: false,
    submitQuery: {
      type: QueryType.Post,
      endpoint: Endpoint.Content
    }
  },
  {
    type: InputType.Dropdown,
    name: 'language',
    label: 'Language of search results',
    placeholder: 'Select Language',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigFlag.Languages
  },
  {
    type: InputType.Dropdown,
    name: 'country',
    label: 'Region of search engines',
    placeholder: 'Select region',
    required: true,
    data: undefined,
    requiresRemoteData: RemoteConfigFlag.Countries
  },

  {
    type: InputType.CheckboxGroup,
    name: 'search_engines',
    label: 'Search engines',
    placeholder: 'Select search engines',
    variant: 'horizontal',
    required: true,
    data: undefined,
    checked: ['google'],
    requiresRemoteData: RemoteConfigFlag.Engines
  },
  {
    type: InputType.Hidden,
    name: 'isApi',
    value: true
  }
];

export const METADATA_SIMILARITY_BASIC_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.Text,
    name: 'url',
    label: 'Domain URL',
    placeholder: 'Add domain url',
    required: true,
    submitQuery: {
      type: QueryType.Post,
      endpoint: Endpoint.Fingerprint,
      route: '/search/metadata/'
    }
  },
  {
    type: InputType.Hidden,
    name: 'run_urlscan',
    value: false
  }
];

export const METADATA_SIMILARITY_ADVANCED_FORM_CONFIG: InputConfig[] = [
  {
    type: InputType.Text,
    name: 'url',
    label: 'Domain URL',
    placeholder: 'Add domain url',
    required: true,
    submitQuery: {
      type: QueryType.Post,
      endpoint: Endpoint.Fingerprint
    }
  },
  {
    type: InputType.Checkbox,
    name: 'run_urlscan',
    label: 'Run Url scan',
    value: '1',
    required: true,
    checked: false,
    tooltip:
      'UrlScan is a service that scans and analyzes websites to assess their safety, content, and behavior, providing detailed reports on the results.'
  }
];

export const USE_CASE1_FORM_DATA = {
  contentToSearch: 'https://www.rt.com/news/594935-us-uk-ukraine-moscow-terrorism/',
  country: 'us',
  language: 'en',
  search_engines: ['google'],
}

export const USE_CASE2_FORM_DATA = {
  url: 'https://actualidad.rt.com,https://actualidad-rt.com,https://esrt.online,https://esrt.press',
  run_urlscan: '1',
}

export const USE_CASE3_FORM_DATA = {
  url: 'https://globalresearch.ca/',
  run_urlscan: '1',
}


export const CANVAS_PARTICLES_CONFIG = {
    fullScreen: {
      enable: false,
    },
    particles: {
        color: {
            value: ['#666600', '#666666', '#660000']
        },
        modes: {
          trail: {
            delay: 1,
            pauseOnStop: false,
            quantity: 1
          },
        },
        links: {
            enable: true,
            //maxDistance: 500,
            color: ['#666600', '#666666', '#660000']


        },
        move: {
            enable: true,
            maxSpeed: 0.2,
        },
        number: {
            value: 80 
        }
    }
};
        // Particles.init({
        //     selector: '.background',
        //     color: ['#666600', '#666666', '#660000'],
        //     connectParticles: true,
        //     speed: 0.3,
        //     minDistance: 130,
        // });

export const DOMAIN_ASSOCIATIONS: DomainAssociation[] = [
  {value: "EUvsDisinfo", label: "What is Eu VS Disinfo?", glyph: "EU"}, 
  {value: "statemedia", label: "What is statemedia?", glyph: "gov"},

]
