export interface GetAllDogBreedsResponse {
  [x: string]: string[];
}

export interface DogAPIResponse<T> {
  message: T;
  status: 'success'|'error'
}
