import React from 'react';
import { useDogs } from '../hooks/useDogs.hook';
import '../styles/dog-navigator.scss';

function DogNavigator () {
  const {
    dogInSpotlight,
    breedInSpotlight,
    dogBreedList,
    fetchImageForBreedInSpotlight
  } = useDogs("https://dog.ceo/api/breeds/image/random")

  return (
    <div>
      <div className="dog-in-spotlight">
        {
          dogInSpotlight ?
            <img src={dogInSpotlight} alt="" />
            :
            <h1>Loading dog in spotlight...</h1>
        }
      </div>
      <div className="dog-breed-list">
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
    </div>
  )
}

export default DogNavigator;
