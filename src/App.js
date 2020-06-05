import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";
import SearchParams from "./SearchParams";

const App = () => {
  // return React.createElement("div", { id: "container" }, [
  //   React.createElement("h1", {}, "Adopt me"),
  //   React.createElement(Pet, {
  //     name: "deepu",
  //     category: "hubby",
  //     type: "human",
  //   }),
  //   React.createElement(Pet, {
  //     name: "carrot",
  //     category: "plant",
  //     type: "veggie",
  //   }),
  //   React.createElement(Pet, {
  //     name: "beans",
  //     category: "plant",
  //     type: "veggie",
  //   }),
  // ]);
  return (
    <div id="container">
      <h1>Adopt me</h1>
      <Pet name="deepu" category="hubby" type="human" />
      <Pet name="carrot" category="plant" type="veggie" />
      <Pet name="beans" category="plant" type="veggie" />
      <SearchParams />
    </div>
  );
};

render(<App />, document.getElementById("root"));
