import React from "react";
import PropTypes from "prop-types";
import { Radio } from "semantic-ui-react";

const CountryFilter = props => {
  const onChangeHandler = (event, { value, checked }) => {
    props.onChangeHandler(value, checked);
  };

  return (
    <Radio
      label={props.label}
      onChange={onChangeHandler}
      value={props.label}
      toggle
    />
  );
};

CountryFilter.propTypes = {};

export default CountryFilter;
