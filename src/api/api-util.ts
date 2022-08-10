import { DogAPIResponse } from '../typings/dog-api.typings';

export function fetchApiCall<T> (url: string): Promise<T> {
  return fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json();
  })
}

export async function fetchDogAPICall<T> (url: string): Promise<T> {
  const response = await fetchApiCall<DogAPIResponse<T>>(url);
  if (response.status === 'success') {
    return response.message;
  } else {
    const errorMsg = response.message as string;
    throw new Error(errorMsg)
  }
}