import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Heatmap from "../components/Heatmap/Heatmap";
import data from "../data/diet.json";

const App = props => {
  function getUniqFromObjectKey(data, key) {
    return data
      .map(row => row[key])
      .filter((item, index, array) => array.indexOf(item) === index);
  }
  const years = getUniqFromObjectKey(data, "Year");
  const countries = getUniqFromObjectKey(data, "Country");
  let min = null;
  let max = null;

  const parsedData = countries.map(country => {
    const countryData = data
      .filter(row => row.Country === country)
      .map(row => {
        let count = null;
        if (props.category === "vegetables") {
          count =
            row["Cereals and Grains"] +
            row["Pulses"] +
            row["Starchy Roots"] +
            row["Fruit and Vegetables"];
        } else if (props.category === "animal") {
          count = row["Meat"] + row["Dairy & Eggs"];
        }

        if (min === null) {
          min = max = count;
        } else {
          min = count < min ? count : min;
          max = count > max ? count : max;
        }

        return {
          year: row.Year,
          count: count
        };
      });

    return {
      country: country,
      data: countryData
    };
  });

  return (
    <>
      <h1>OWID</h1>
      <Heatmap
        data={parsedData}
        min={min}
        max={max}
        years={years}
        category={props.category}
      />
    </>
  );
};

export default App;
