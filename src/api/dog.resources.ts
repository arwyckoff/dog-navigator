import { GetAllDogBreedsResponse } from '../typings/dog-api.typings';
import { fetchDogAPICall } from './api-util';

export async function fetchDogBreedInSpotlight (
  dogBreed: string
): Promise<string> {
  const response = await fetchDogAPICall<string>('https://dog.ceo/api/breed/' + dogBreed + '/images/random');

  return response;
}

export async function getRandomDogImage () {
  const response = await fetchDogAPICall<string>('https://dog.ceo/api/breeds/image/random');

  return response;
}

export async function getAllDogBreeds () {
  const response = await fetchDogAPICall<GetAllDogBreedsResponse>('https://dog.ceo/api/breeds/list/all');

  return response;
}