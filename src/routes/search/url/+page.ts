import type { PageLoad } from './$types';
import { getAppMetadata } from '$api';

export const load: PageLoad = async () => {
  return {
    metadata: await getAppMetadata()
  };
};
