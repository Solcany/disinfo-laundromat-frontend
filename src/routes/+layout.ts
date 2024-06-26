import type { LayoutLoad } from './$types';
import { error, type NumericRange } from '@sveltejs/kit';
import { Endpoint } from '$config';
import { QueryType } from '$types';
import { type ApiResponse, queryApi } from '$api';

import { InputType, type InputConfig, type InputTypeWithData } from '$components/Form.svelte';

import { type LabeledValue } from '$types';

import {
  RemoteConfigFlag,
  REMOTE_CONFIG_FLAG_DATA,
  CONTENT_SIMILARITY_BASIC_FORM_CONFIG,
  CONTENT_SIMILARITY_ADVANCED_FORM_CONFIG,
  TECHNICAL_SIMILARITY_BASIC_FORM_CONFIG,
  TECHNICAL_SIMILARITY_ADVANCED_FORM_CONFIG
} from '$config';

export const load: LayoutLoad = async ({ data }) => {
  let response: ApiResponse<any> = await queryApi(QueryType.Get, Endpoint.AppConfig);

  if (response.error) {
    if (response.status >= 400 && response.status <= 599) {
      error(response.status as NumericRange<400, 599>, { message: response.error });
    } else {
      console.error(
        `API returned a non-error status code (${response.status}) with an error message: ${response.error}`
      );
    }
  }
  if (response.data) {
    return {
      contentSimilarityBasicFormConfig: enhanceFormConfig(
        CONTENT_SIMILARITY_BASIC_FORM_CONFIG,
        response.data
      ),
      contentSimilarityAdvancedFormConfig: enhanceFormConfig(
        CONTENT_SIMILARITY_ADVANCED_FORM_CONFIG,
        response.data
      ),
      technicalSimilarityBasicFormConfig: enhanceFormConfig(
        TECHNICAL_SIMILARITY_BASIC_FORM_CONFIG,
        response.data
      ),
      technicalSimilarityAdvancedFormConfig: enhanceFormConfig(
        TECHNICAL_SIMILARITY_ADVANCED_FORM_CONFIG,
        response.data
      ),
      indicatorMetadata: response.data.indicator_metadata,
      // server data is passed from +layout.server.ts
      gdpr_consent: data.gdpr_consent
    };
  }

  // WIP: handle situation where there's successful response but no data
};

function enhanceFormConfig(
  config: InputConfig[],
  apiConfigData: Record<string, Record<string, string | number>>
) {
  return config.map((item) => {
    if (doesInputRequireRemoteData(item)) {
      const { key, defaultKey } =
        REMOTE_CONFIG_FLAG_DATA[item.requiresRemoteData as RemoteConfigFlag];

      if (key && apiConfigData[key]) {
        const newData = configToLabeledValues(apiConfigData[key]);
        let defaultValue: LabeledValue;
        if (defaultKey && apiConfigData.defaults[defaultKey]) {
          let value = apiConfigData.defaults[defaultKey];
          let label = apiConfigData[key][value];
          defaultValue = { label: label.toString(), value: value };
        } else {
          defaultValue = newData[0];
        }

        if (item.type === InputType.Hidden) {
          return { ...item, value: defaultValue.value.toString() };
        } else {
          return { ...item, data: newData, value: defaultValue };
        }
      }
    }
    return item;
  });
}

function doesInputRequireRemoteData(item: InputConfig): item is InputTypeWithData {
  return 'requiresRemoteData' in item;
}

function configToLabeledValues(data: Record<string, string | number>): LabeledValue[] {
  return Object.entries(data).map(([key, value]) => ({
    label: value.toString(),
    value: key
  }));
}
