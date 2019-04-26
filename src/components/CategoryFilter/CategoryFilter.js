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
          <Form.Field key={category} className={styles.field}>
            <Radio
              label={category}
              name="filters"
              value={category}
              checked={props.activeCategory === category}
              onChange={onChangeHandler}
            />
          </Form.Field>
        );
      })}
    </Form>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

export default CategoryFilter;
