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

export interface ContentData {
  form: FormData;
  content: ContentResult;
}


