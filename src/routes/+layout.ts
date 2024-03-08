import type { LayoutLoad } from './$types';
import { getAppConfig } from '$api';

export const load: LayoutLoad = async () => {
  return {
    appConfig: await getAppConfig()
  };
};
