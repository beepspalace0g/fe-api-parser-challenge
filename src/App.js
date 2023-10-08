import './App.scss'
import Species from './Species'
import React, {useEffect, useState} from 'react'

const API_URL = 'https://swapi.dev/api/films/2/'
const SPECIES_IMAGES = {
  droid:
    'https://static.wikia.nocookie.net/starwars/images/f/fb/Droid_Trio_TLJ_alt.png',
  human:
    'https://static.wikia.nocookie.net/starwars/images/3/3f/HumansInTheResistance-TROS.jpg',
  trandoshan:
    'https://static.wikia.nocookie.net/starwars/images/7/72/Bossk_full_body.png',
  wookie:
    'https://static.wikia.nocookie.net/starwars/images/1/1e/Chewbacca-Fathead.png',
  "yoda's species":
    'https://static.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png',
}
const CM_TO_IN_CONVERSION_RATIO = 2.54

function App() {
  const [species, setSpecies] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(response => {
        const speciesUrls = response.species
        const speciesPromises = speciesUrls.map(url =>
          fetch(url.replace('http://', 'https://')).then(response =>
            response.json()
          )
        )

        Promise.all(speciesPromises).then(response => setSpecies(response))
      })
  }, [])

  return (
    <div className="App">
      <h1>Empire Strikes Back - Species Listing</h1>
      <div className="App-species">
        {species.map(specie => (
          <Species
            key={specie.url}
            name={specie.name}
            designation={specie.designation}
            height={
              specie.average_height
                ? (specie.average_height / CM_TO_IN_CONVERSION_RATIO).toFixed(2)
                : null
            }
            numFilms={specie.films.length}
            language={specie.language}
            classification={specie.classification}
            image={SPECIES_IMAGES[specie.name.toLowerCase()]}
          />
        ))}
      </div>
    </div>
  )
}

export default App
