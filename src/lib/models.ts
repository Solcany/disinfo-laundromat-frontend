export interface LabeledValue {
  label: string;
  value: any;
}

export interface ContentApiInput {
  region: LabeledValue;
  language: LabeledValue;
  browser: LabeledValue;
  content: string;
  [index: string]: string | LabeledValue;
}

export interface ContentResult {
  domain: string;
  domain_count: number;
  engines: string[];
  link_count: number;
  score: number;
  snippet: string;
  source: string[];
  title: string;
  url: string;
}

export interface IndicatorMetadata {
  description: string;
  interpretation: string;
  name: string;
}

export interface ContentResponse {
  countries: {
    [key: string]: string;
  };
  csv_data: string;
  indicator_metadata: {
    [key: string]: IndicatorMetadata;
  };
  languages: {
    [key: string]: string;
  };
  results: ContentResult[];
}

export class ContentData {
  private content: ContentResponse;

  constructor(content: ContentResponse) {
    this.content = content;
  }

  getResults() {
    return this.content.results;
  }

  isEmpty() {
    const { countries, csv_data, indicator_metadata, languages, results } = this.content;
    return (
      Object.keys(countries).length === 0 &&
      csv_data === '' &&
      Object.keys(indicator_metadata).length === 0 &&
      Object.keys(languages).length === 0 &&
      Object.keys(results).length === 0
    );
  }
}