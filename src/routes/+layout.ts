import type { LayoutLoad } from './$types';
import type {LabeledValue} from '$models';

import { CONTENT_PAGE_FORM_CONFIG, 
         URL_PAGE_FORM_CONFIG, 
         METADATA_PAGE_FORM_CONFIG } from '$config';

import { getAppConfig } from '$api';

  // todo:
  // update local config dat with data fetched from API
  // this has to be done for every  config manually 
//
export const load: LayoutLoad = async () => {
  let appData = await getAppConfig();

  // copy local config
  let upatedConfig = [...CONTENT_PAGE_FORM_CONFIG];
  let languageField = upatedConfig.find(field => field.name === 'language');

  // ohh appData is ApiResponse, it needs to be checked for errors before data is available,
  // should this error checking be done here?
  // if there's error push it to the global errorStore and show a toast?
  // where else though?
  const languages : LabeledValue[] = [];
  for (const [key, value] of Object.entries(appData.languages)) {
      languages.push({ label: value as string, value: key as string});
  }




  return {
    appConfig: await getAppConfig()
  };
};
