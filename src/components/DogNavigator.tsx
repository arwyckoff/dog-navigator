import React, { useCallback, useEffect, useState } from 'react';
import { fetchDogBreedInSpotlight, getAllDogBreeds, getRandomDogImage } from '../api/dog.resources';
import { GetAllDogBreedsResponse } from '../typings/dog-api.typings';
import { DogBreedListItem } from '../typings/dog-ui.typings';

export function useDogs (
  defaultDogImageURL: string
) {
  const [dogInSpotlight, setDogInSpotlight] = useState(defaultDogImageURL);
  const [breedInSpotlight, setBreedInSpotlight] = useState<string>("");
  const [allDogBreeds, setAllDogBreeds] = useState<GetAllDogBreedsResponse>({});
  const [dogBreedList, setDogBreedList] = useState<DogBreedListItem[]>([]);

  useEffect(() => {
    getRandomDogImage()
    .then((imageURL) => {
      setDogInSpotlight(imageURL);
    });
  }, [])

  useEffect(() => {
    getAllDogBreeds()
    .then((allDogBreeds) => {
      const list = getListOfDogs(10, allDogBreeds);
      setDogBreedList(list);
    });
  }, [])

  const fetchImageForBreedInSpotlight = useCallback(async (breedForNewImage: string) => {
    const imageURL = await fetchDogBreedInSpotlight(breedForNewImage);
    setDogInSpotlight(imageURL)
  }, [setDogInSpotlight])

  function getListOfDogs (
    numberToReturn: number,
    allDogBreeds: GetAllDogBreedsResponse
  ): DogBreedListItem[] {
    const dogBreedListItems: DogBreedListItem[] = [];
    Object.keys(allDogBreeds).forEach((key) => {
      if (allDogBreeds[key].length) {
        allDogBreeds[key].forEach((subKey) => {
          dogBreedListItems.push({
            name: subKey + ' ' + key,
            apiRef: key + '/' + subKey
          });
        });
      } else {
        dogBreedListItems.push({
          name: key,
          apiRef: key
        });
      }
    });
    const listOfDogBreeds: DogBreedListItem[] = [];
    for (let i = 0; i < numberToReturn; i++) {
      const randomBreedIndex = Math.floor(dogBreedListItems.length * Math.random());
      const randomDogBreed = dogBreedListItems[randomBreedIndex] as any
      if (!listOfDogBreeds.includes(randomDogBreed)) {
        listOfDogBreeds.push(randomDogBreed)
      }
    }
    return listOfDogBreeds;
  }

  return {
    dogInSpotlight,
    breedInSpotlight,
    allDogBreeds,
    dogBreedList,
    setBreedInSpotlight,
    fetchImageForBreedInSpotlight
  }

}
function DogNavigator () {
  const {
    dogInSpotlight,
    breedInSpotlight,
    allDogBreeds,
    dogBreedList,
    setBreedInSpotlight,
    fetchImageForBreedInSpotlight
  } = useDogs("https://dog.ceo/api/breeds/image/random")

  // make links a new component that take props and fire a callback (prop) when clicked
  return (
    <div>
      {breedInSpotlight}
      <img src={dogInSpotlight} alt="" />
      {
        dogBreedList ?
          dogBreedList.map((dogBreed) => (
            <button key={dogBreed.name} onClick={() => fetchImageForBreedInSpotlight(dogBreed.apiRef)}>
              {dogBreed.name}
            </button>
          ))
        :
        <h1>Loading dog breed list...</h1>
      }
    </div>
  )
}

export default DogNavigator;
