import { useCallback, useEffect, useState } from 'react';
import { fetchDogBreedInSpotlight, getAllDogBreeds, getRandomDogImage } from '../api/dog.resources';
import { GetAllDogBreedsResponse } from '../typings/dog-api.typings';
import { DogBreedListItem } from '../typings/dog-ui.typings';

/**
 * 
 * @param defaultDogImageURL Used to initialize the dog in the spotlight image
 * @returns States and callbacks for navigating and spotlighting dogs by breed
 */
export function useDogs (
  defaultDogImageURL: string
) {
  const [dogInSpotlight, setDogInSpotlight] = useState(defaultDogImageURL);
  const [breedInSpotlight, setBreedInSpotlight] = useState<string>("");
  const [allDogBreeds, setAllDogBreeds] = useState<DogBreedListItem[]>();
  const [dogBreedList, setDogBreedList] = useState<DogBreedListItem[]>([]);

  /**
   * Sets the initial dog in spotlight
   */
  useEffect(() => {
    getRandomDogImage()
    .then((imageURL) => {
      setDogInSpotlight(imageURL);
    });
  }, [])

  /**
   * Sets the initial list of dog breeds on the state
   * Sets initial list of 10 random breeds
   */
  useEffect(() => {
    getAllDogBreeds()
    .then((allDogBreeds) => {
      const list = getListOfDogs(allDogBreeds);
      setAllDogBreeds(list);
      const randomListOfDogBreeds = getRandomListOfDogBreeds(10, list);
      setDogBreedList(randomListOfDogBreeds);
    });
  }, [])

  /**
   * Updates the list of 10 random dog breeds when the dog in spotlight changes
   */
  useEffect(() => {
    if (allDogBreeds) {
      const randomListOfDogBreeds = getRandomListOfDogBreeds(10, allDogBreeds);
      setDogBreedList(randomListOfDogBreeds);
    }
  }, [dogInSpotlight])

  /**
   *  Callback for updating the dog in spotlight when random dog breed is clicked
   */
  const fetchImageForBreedInSpotlight = useCallback(async (breedForNewImage: string) => {
    setDogInSpotlight('')
    // timeout for better UI loading state
    setTimeout(async () => {
      const imageURL = await fetchDogBreedInSpotlight(breedForNewImage);
      setDogInSpotlight(imageURL)
    }, 500)
  }, [setDogInSpotlight])

  /**
   * 
   * @param allDogBreeds API response from dog breed endpoint
   * @returns Adapted list containing the UI friendly name and API URL string
   */
  function getListOfDogs (
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

    return dogBreedListItems;
  }

  /**
   * 
   * @param numberToReturn Number of dogs returned from this func
   * @param dogBreedListItems Entire list of dog breeds
   * @returns Random list of dog breed list items consumed by UI
   */
  function getRandomListOfDogBreeds(
    numberToReturn: number,
    dogBreedListItems: DogBreedListItem[]
  ) {
    const listOfDogBreeds: DogBreedListItem[] = dogBreedListItems.sort(() => {
      return Math.random() > 0.5 ? 1 : -1;
    })

    return listOfDogBreeds.slice(0, numberToReturn);
  }

  return {
    dogInSpotlight,
    breedInSpotlight,
    dogBreedList,
    fetchImageForBreedInSpotlight
  }
}