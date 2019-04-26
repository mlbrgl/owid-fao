import React from "react";
import PropTypes from "prop-types";
import { Form, Radio } from "semantic-ui-react";
import styles from "./CategoryFilter.module.css";

const CategoryFilter = props => {
  const onChangeHandler = (event, { value }) => {
    props.onChangeHandler(value);
  };

  return (
    <Form>
      {props.categories.map(category => {
        return (
          <Form.Field key={category.name} className={styles.field}>
            <Radio
              label={category.name}
              name="filters"
              value={category.name}
              checked={props.activeCategory.name === category.name}
              onChange={onChangeHandler}
            />
          </Form.Field>
        );
      })}
    </Form>
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
