import { API_URL } from '$config';

export async function queryApi(endpoint: string, data: FormData) {
  try {
    const query = API_URL.concat(endpoint);
    const response = await fetch(query, {
      method: 'POST',
      body: data
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


export async function parseUrl(data: FormData) {
    return queryApi('parse-url', data); 
}	

//export async parseUrl: async ({ request }) => {
//    const data = await request.formData();
//    const responseData = await queryApi('parse-url', data);
//    if(responseData) {
//      return { props: { data: responseData }};
//    } else {
//      return { props: { }};
//    }
//  }
//} satisfies Actions;
