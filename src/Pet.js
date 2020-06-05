import React from "react";
export default function Pet({ name, category, type }) {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{category}</h2>
      <h2>{type}</h2>
    </div>
  );
}
