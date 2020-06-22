import React, { lazy } from "react";
import Pet, { Photo } from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate, RouteComponentProps } from "@reach/router";

const Modal = lazy(() => import("./Modal"));

class Details extends React.Component<RouteComponentProps<{ id: string }>> {
  public state = {
    loading: true,
    showModal: false,
    name: "",
    url: "",
    type: "",
    breed: "",
    description: "",
    location: "",
    media: [] as Photo[],
  };

  public componentDidMount() {
    this.props.id
      ? // throw new Error("lol");
        Pet.animal(+this.props.id).then(({ animal }) => {
          this.setState({
            url: animal.url,
            id: animal.id,
            name: animal.name,
            type: animal.type,
            breed: animal.breeds,
            description: animal.description,
            location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
            media: animal.photos,
            loading: false,
          });
        }, console.error)
      : navigate("/");
  }

  public toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  public adopt = () => {
    return navigate(this.state.url);
  };

  public render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }
    const {
      name,
      type,
      breed,
      description,
      location,
      media,
      showModal,
    } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${type} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1> Are you sure you want to adopt {name} ?</h1>
              <div className="buttons">
                <button type="submit" onClick={this.adopt}>
                  Yes
                </button>
                <button type="button" onClick={this.toggleModal}>
                  No
                </button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithError(
  props: RouteComponentProps<{ id: string }>
) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
