import React, { useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Heatmap from "../components/Heatmap/Heatmap";
import data from "../data/diet.json";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import { Message } from "semantic-ui-react";

const App = () => {
  function getUniqFromObjectKey(data, key) {
    return data
      .map(row => row[key])
      .filter((item, index, array) => array.indexOf(item) === index);
  }
  const years = getUniqFromObjectKey(data, "Year");
  const countries = getUniqFromObjectKey(data, "Country");
  let min = null;
  let max = null;

  const ANIMAL = "Animal";
  const PLANT = "Plant";
  const SUGAR = "Sugar";
  const ALCOHOL = "Alcoholic beverages";
  const categories = [ANIMAL, PLANT, SUGAR, ALCOHOL];

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeCountries, setActiveCountries] = useState([]);

  const parsedData = countries.map(country => {
    const countryData = data
      .filter(row => row.Country === country)
      .map(row => {
        let count = null;
        if (activeCategory === PLANT) {
          count =
            row["Cereals and Grains"] +
            row["Pulses"] +
            row["Starchy Roots"] +
            row["Fruit and Vegetables"];
        } else if (activeCategory === ANIMAL) {
          count = row["Meat"] + row["Dairy & Eggs"];
        } else if (activeCategory === SUGAR) {
          count = row["Sugar"];
        } else if (activeCategory === ALCOHOL) {
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
      data: countryData,
      active: activeCountries.indexOf(country) !== -1
    };
  });

  const onChangeCategoryHandler = category => {
    setActiveCategory(category);
  };

  const onChangeCountriesHandler = (country, checked) => {
    let updatedActiveCountries = [];
    if (checked) {
      updatedActiveCountries = [...activeCountries, country];
    } else {
      updatedActiveCountries = activeCountries.filter(
        activeCountry => activeCountry !== country
      );
    }
    setActiveCountries(updatedActiveCountries);
  };

  return (
    <>
      <h1>Evolution of diet composition between 1961 and 2013 </h1>
      <Message>
        <Message.Header>How to read</Message.Header>
        <p>
          The color scale shows the amount of calories consumed in the selected
          category ({activeCategory}).
        </p>
        <p>
          <strong>Red is less, green is more.</strong> An evolution from red to
          green shows an increase in the amount of calories consumed in the
          current category, and vice-versa.
        </p>
      </Message>
      <CategoryFilter
        categories={categories}
        onChangeHandler={onChangeCategoryHandler}
        activeCategory={activeCategory}
      />
      <Heatmap
        data={parsedData}
        min={min}
        max={max}
        years={years}
        onChangeCountriesHandler={onChangeCountriesHandler}
      />
    </>
  );
};

export default App;
