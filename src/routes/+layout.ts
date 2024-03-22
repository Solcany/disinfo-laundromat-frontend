import type { LayoutLoad } from './$types';
import type { LabeledValue, ApiResponse } from '$models';
import { error, type NumericRange } from '@sveltejs/kit';
import {
  QueryType,
  Endpoint,
  RemoteConfigFlag,
  RemoteConfigFlagData,
  type InputConfig,
  type InputTypeWithData
} from '$models';
import { CONTENT_PAGE_FORM_CONFIG, URL_PAGE_FORM_CONFIG, METADATA_PAGE_FORM_CONFIG } from '$config';
import { queryApi } from '$api';

export const load: LayoutLoad = async () => {
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
    console.log(response.data);
    return {
      contentFormConfig: enhanceFormConfig(CONTENT_PAGE_FORM_CONFIG, response.data),
      urlFormConfig: enhanceFormConfig(URL_PAGE_FORM_CONFIG, response.data),
      metadataFormConfig: enhanceFormConfig(METADATA_PAGE_FORM_CONFIG, response.data)
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
      const {key, defaultKey} = RemoteConfigFlagData[item.requiresRemoteData as RemoteConfigFlag]; 

      if (key && apiConfigData[key]) {
        const newData = configToLabeledValues(apiConfigData[key]);

        let defaultValue : LabeledValue;
        if(defaultKey && apiConfigData.defaults[defaultKey]) {
          let value = apiConfigData.defaults[defaultKey]
          console.log(value);
          let label = apiConfigData[key][value];
          defaultValue = { label: label.toString(), value: value }
        } else {
          defaultValue = newData[0];
        }

        return { ...item, data: newData, value: defaultValue};
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
