import React from "react";
import PropTypes from "prop-types";
import { Form, Radio } from "semantic-ui-react";

const CategoryFilter = props => {
  const onChangeHandler = (event, { value }) => {
    // console.log(value);
    props.onChangeHandler(value);
  };

  return (
    <Form>
      {props.filters.map(filter => {
        return (
          <Form.Field key={filter.category}>
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
