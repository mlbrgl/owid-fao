import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

const CategoryFilter = props => {
  const onChangeHandler = (event, { name }) => {
    props.onChangeHandler(name);
  };

  return (
    <Menu.Menu>
      {props.categories.map(category => {
        return (
          <Menu.Item
            key={category.name}
            name={category.name}
            active={props.activeCategory.name === category.name}
            onClick={onChangeHandler}
          />
        );
      })}
    </Menu.Menu>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ).isRequired,
  activeCategory: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

export default CategoryFilter;
