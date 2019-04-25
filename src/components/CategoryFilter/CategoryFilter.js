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
      {props.filters.map(filter => {
        return (
          <Form.Field key={filter.category} className={styles.field}>
            <Radio
              label={filter.label}
              name="filters"
              value={filter.category}
              checked={props.category === filter.category}
              onChange={onChangeHandler}
            />
          </Form.Field>
        );
      })}
    </Form>
  );
};

CategoryFilter.propTypes = {};

export default CategoryFilter;
