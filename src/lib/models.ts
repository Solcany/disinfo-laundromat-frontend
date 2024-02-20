export interface LabeledValue {
  label: string;
  value: any;
}

export interface ContentQueryData {
  region: LabeledValue;
  language: LabeledValue;
  browser: LabeledValue;
  content: string;  
  [index: string]: string | LabeledValue;
}

export interface ContentResult {
  countries: {
    [key: string]: string;
  };
  csv_data: string;
  indicator_metadata: {
    [key: string]: {
      description: string;
      interpretation: string;
      name: string;
    }
  };
  languages: {
    [key: string]: string;
  }
  results: {
    [key: number]: {
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
  }
}

export class ContentData {
    private content: ContentResult;

    constructor(content: ContentResult) {
        this.content = content;
    }
    
    get() {
        return this.content;
    }

    set(content: ContentResult) {
        this.content = content;
    }

    isEmpty() {
        const { countries, csv_data, indicator_metadata, languages, results } = this.content;
        return Object.keys(countries).length === 0 &&
               csv_data === '' &&
               Object.keys(indicator_metadata).length === 0 &&
               Object.keys(languages).length === 0 &&
               Object.keys(results).length === 0;
    }
}




