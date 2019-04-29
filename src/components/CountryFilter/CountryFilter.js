import React from "react";
import PropTypes from "prop-types";

const CountryFilter = props => {
  const onChangeHandler = event => {
    props.onChangeHandler(event.target.name, event.target.checked);
  };

  return (
    <div className="ui toggle checkbox">
      <input
        type="checkbox"
        onChange={onChangeHandler}
        name={props.label}
        checked={props.active}
      />
      <label>{props.label}</label>
    </div>
  );
};

CountryFilter.propTypes = {
  label: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};

export default React.memo(CountryFilter);
