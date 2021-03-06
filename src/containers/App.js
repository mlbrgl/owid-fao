import React, { useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Heatmap from "../components/Heatmap/Heatmap";
import data from "../data/diet.json";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import { Message } from "semantic-ui-react";

const App = props => {
  function getUniqFromObjectKey(data, key) {
    return data
      .map(row => row[key])
      .filter((item, index, array) => array.indexOf(item) === index);
  }
  const years = getUniqFromObjectKey(data, "Year");
  console.log(years);
  const countries = getUniqFromObjectKey(data, "Country");
  let min = null;
  let max = null;

  const filters = [
    {
      label: "Animal",
      category: "animal"
    },
    {
      label: "Plant",
      category: "plant"
    },
    {
      label: "Sugar",
      category: "sugar"
    },
    {
      label: "Alcoholic beverages",
      category: "alcohol"
    }
  ];

  const [category, setCategory] = useState(filters[0].category);

  const parsedData = countries.map(country => {
    const countryData = data
      .filter(row => row.Country === country)
      .map(row => {
        let count = null;
        if (category === "plant") {
          count =
            row["Cereals and Grains"] +
            row["Pulses"] +
            row["Starchy Roots"] +
            row["Fruit and Vegetables"];
        } else if (category === "animal") {
          count = row["Meat"] + row["Dairy & Eggs"];
        } else if (category === "sugar") {
          count = row["Sugar"];
        } else if (category === "alcohol") {
          count = row["Alcoholic Beverages"];
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

  const onChangeCategoryHandler = category => {
    setCategory(category);
  };

  const getCategoryName = category => {
    return filters.filter(el => el.category === category).map(el => el.label);
  };

  return (
    <>
      <h1>Evolution of diet composition between 1961 and 2013 </h1>
      <Message>
        <Message.Header>How to read</Message.Header>
        <p>
          The color scale shows the amount of calories consumed in the selected
          category ({getCategoryName(category)}).
        </p>
        <p>
          <strong>Red is less, green is more.</strong> An evolution from red to
          green shows an increase in the amount of calories consumed in the
          current category, and vice-versa.
        </p>
      </Message>
      <CategoryFilter
        filters={filters}
        onChangeHandler={onChangeCategoryHandler}
        category={category}
      />
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
