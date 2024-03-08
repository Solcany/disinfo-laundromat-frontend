import type { LayoutServerLoad } from './$types';
import { getAppMetadata } from '$api';

export const load: LayoutServerLoad = async () => {
  return {
    metadata: await getAppMetadata()
  };
};
