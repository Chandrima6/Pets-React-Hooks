import React from "react";
import Pet from "@frontendmasters/pet";
import Carousel from "./Carousel";

class Details extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    Pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        id: animal.id,
        name: animal.name,
        type: animal.type,
        breed: animal.breeds,
        description: animal.description,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        media: animal.photos,
        loading: false,
      });
    }, console.error);
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }
    const { name, type, breed, description, location, media } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${type} - ${breed.primary} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
