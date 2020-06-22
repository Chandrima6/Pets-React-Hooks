import React from "react";
import Pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import changeLocation from "./actionCreators/changeLocation";
import changeTheme from "./actionCreators/changeTheme";
import { connect } from "react-redux";

const SearchParams = (props) => {
  // const [location, updateLocation] = React.useState("Seattle, WA");
  const [pets, updatePets] = React.useState([]);
  const [breeds, updateBreeds] = React.useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);
  // const [theme, updateTheme] = React.useContext(ThemeContext);

  async function retrievePets() {
    const { animals } = await Pet.animals({
      location: props.location,
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
      <h1>{props.location}</h1>
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
            value={props.location}
            placeholder="Location"
            onChange={(e) => props.updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          <select
            id="theme"
            value={props.theme}
            onChange={(e) => props.updateTheme(e.target.value)}
            onBlur={(e) => props.updateTheme(e.target.value)}
          >
            <option value="darkblue">Dark Blue</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
          </select>
        </label>
        <button style={{ backgroundColor: props.theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

const mapStateToProps = ({ theme, location }) => ({ theme, location });
const mapDispatchToProps = (dispatch) => ({
  updateLocation: (location) => dispatch(changeLocation(location)),
  updateTheme: (theme) => dispatch(changeTheme(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);
