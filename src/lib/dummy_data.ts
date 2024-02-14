import type { LabeledValue } from '$types';

export const region_data: LabeledValue[] = [
  { label: 'US', value: 'US' },
  { label: 'NL', value: 'NL' }
];

export const language_data: LabeledValue[] = [
  { label: 'english', value: 'english' },
  { label: 'dutch', value: 'dutch' }
];

export const browser_data: LabeledValue[] = [
  { label: 'all browsers', value: 'all' },
  { label: 'Google', value: 'Google' },
  { label: 'Bing', value: 'Bing' }
];


interface Result {
  domain: string;
  associations: string[];
  title: string;
  snippet: string,
  engines: string[];
  match_score: string;
}

export const content_result_data: Result[] = [
  {
    domain: "catalog.libraries.psu.edu",
   associations: [],
   title: "We Are the Ones We Have Been Waiting For : the Promise of Civic …",
   snippet: "WebLanguage Note: English. Contents: Cover -- Contents -- 1. Overview: The Public and Our Problems -- 2. How to Think About Politics: Values, Facts, and Strategies -- 3.",
   engines: ["bing"],
   match_score: "26.1"
  },
  {
    domain: "constitutionallawenforcement.us",
   associations: ["R"],
   title: "U.S. Constitutional Law Enforcement",
   snippet: "In RED-HANDED, six-time New York Times bestselling investigator Peter Schweizer presents his most alarming findings to date by revealing the secret deals wealthy Americans have cut to help China build its military, technological, and economic might.",
   engines: ["yandex"],
   match_score: "13.1"
  },
];
