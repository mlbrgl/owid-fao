import {
  categories,
  years,
  getActiveData,
  getCategoryBounds
} from "./../Parser/Parser";
import {} from "./../Parser/Parser";
import React, { useState, useMemo } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Heatmap from "../../components/Heatmap/Heatmap";

import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { Message } from "semantic-ui-react";

const App = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeCountries, setActiveCountries] = useState([]);

  // [{
  //   country:
  //   data : [{
  //     year:
  //     count:
  //     category:
  //   }]
  // }]
  const activeData = getActiveData(activeCountries, activeCategory);
  const categoryBounds = useMemo(() => getCategoryBounds(activeCategory), [
    activeCategory
  ]);

  const onChangeCategoryHandler = categoryName => {
    setActiveCategory(
      categories.filter(category => category.name === categoryName)[0]
    );
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
          category ({activeCategory.name}).
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
        data={activeData}
        bounds={categoryBounds}
        years={years}
        onChangeCountriesHandler={onChangeCountriesHandler}
      />
    </>
  );
};

export default App;
