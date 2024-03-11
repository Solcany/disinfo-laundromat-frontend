import type { LayoutLoad } from './$types';
import type {LabeledValue, ApiResponse} from '$models';
import { error, type NumericRange } from '@sveltejs/kit';

import { CONTENT_PAGE_FORM_CONFIG, 
         URL_PAGE_FORM_CONFIG, 
         METADATA_PAGE_FORM_CONFIG } from '$config';

import { getAppConfig } from '$api';

export const load: LayoutLoad = async () => {
  let response = await getAppConfig();
  let appConfig = {};

  if (response.error && response.status >= 400 && response.status <= 599) {
    error(response.status as NumericRange<400, 599>, { message: response.error });
  } else if (response.error) {
    console.error(`API returned a non-error status code (${response.status}) with an error message: ${response.error}`);
  } else {
    console.log(response);
  }
   // const languages: LabeledValue[] = Object.entries(response.languages).map(([key, value]) => ({
   //   label: value as string,
   //   value: key
   // }));
 // return {
 //   appConfig: updatedConfig;
 // };
};
