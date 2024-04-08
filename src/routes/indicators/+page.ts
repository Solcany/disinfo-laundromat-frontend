import type { PageLoad } from './$types';
import type { LabeledValue, ApiResponse } from '$models';
import { error, type NumericRange } from '@sveltejs/kit';
import { QueryType, Endpoint } from '$models';

import { queryApi } from '$api';

export const load: PageLoad = async () => {
  let response: ApiResponse<any> = await queryApi(QueryType.Get, Endpoint.Indicators);

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
    return { indicator: response.data };
  }
};
