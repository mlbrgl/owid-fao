import {
  categories,
  countries,
  years,
  getActiveData,
  getCategoryBounds
} from "./../Parser/Parser";
import React, { Component } from "react";
import Heatmap from "../../components/Heatmap/Heatmap";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { Radio, Menu, Popup, Icon } from "semantic-ui-react";
import styles from "./App.module.css";
import "semantic-ui-css/semantic.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    const activeCategory = categories[0];
    const activeCountries = [];
    this.state = {
      activeCategory,
      activeCountries
    };
  }

  // [{
  //   country:
  //   data : [{
  //     year:
  //     count:
  //     category:
  //   }]
  // }]

  onChangeCategoryHandler = categoryName => {
    const activeCategory = categories.filter(
      category => category.name === categoryName
    )[0];
    this.setState({ activeCategory });
  };

  onChangeCountriesHandler = (country, checked) => {
    let activeCountries = [];
    if (checked) {
      activeCountries = [...this.state.activeCountries, country];
    } else {
      activeCountries = this.state.activeCountries.filter(
        activeCountry => activeCountry !== country
      );
    }
    this.setState({ activeCountries });
  };

  onToggleAllCountriesHandler = (event, { checked }) => {
    const activeCountries = checked ? countries : [];
    this.setState({ activeCountries });
  };

  render() {
    const categoryBounds = getCategoryBounds(this.state.activeCategory);
    const activeData = getActiveData(
      this.state.activeCountries,
      this.state.activeCategory
    );

    return (
      <>
        <h1>Evolution of diet composition between 1961 and 2013 </h1>
        <div className={styles.menuWrapper}>
          <Menu compact>
            <CategoryFilter
              categories={categories}
              onChangeHandler={this.onChangeCategoryHandler}
              activeCategory={this.state.activeCategory}
            />
            <Popup
              trigger={
                <Menu.Item>
                  <Icon name="question circle" />
                </Menu.Item>
              }
            >
              <Popup.Content>
                <p>
                  The color scale shows the amount of calories consumed in the
                  selected category.
                </p>
                <p>
                  <strong>Red is less, green is more.</strong> An evolution from
                  red to green shows an increase in the amount of calories
                  consumed in the current category, and vice-versa.
                </p>
              </Popup.Content>
            </Popup>
          </Menu>
        </div>
        <Radio
          label="Select all"
          onChange={this.onToggleAllCountriesHandler}
          toggle
          className={styles.selectAll}
        />
        <Heatmap
          data={activeData}
          bounds={categoryBounds}
          years={years}
          onChangeCountriesHandler={this.onChangeCountriesHandler}
        />
      </>
    );
  }
}

export default App;
