import React from "react";
import Pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  const [location, updateLocation] = React.useState("Seattle, WA");
  const [pets, updatePets] = React.useState([]);
  const [breeds, updateBreeds] = React.useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);

  async function retrievePets() {
    const { animals } = await Pet.animals({
      location,
      breed,
      type: animal,
    });
    updatePets(animals || []);
  }

  React.useEffect(() => {
    updateBreeds([]);
    updateBreed("");

    Pet.breeds(animal).then(({ breeds: breedsRes }) => {
      const breedArr = breedsRes.map(({ name }) => name);
      updateBreeds(breedArr);
    }, console.error);
  }, [animal]);

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          retrievePets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
