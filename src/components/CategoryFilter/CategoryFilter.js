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
        const isActive = props.activeCategory.name === category.name;
        return (
          <Menu.Item
            key={category.name}
            name={category.name}
            active={isActive}
            onClick={onChangeHandler}
            style={{
              backgroundColor: isActive
                ? `rgb(${category.backgroundColor.join(",")})`
                : "",
              color: isActive ? `rgb(${category.color.join(",")})` : ""
            }}
          />
        );
      })}
    </Menu.Menu>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.arrayOf(PropTypes.number),
      backgroundColor: PropTypes.arrayOf(PropTypes.number).isRequired
    })
  ).isRequired,
  activeCategory: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

export default CategoryFilter;
