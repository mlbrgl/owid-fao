import React from "react";
import PropTypes from "prop-types";
import styles from "./DataCell.module.css";

const DataCell = props => {
  return (
    <td
      style={{ backgroundColor: props.backgroundColor }}
      className={styles.dataCell}
      data-tooltip={props.content}
    />
  );
};

DataCell.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired
};

export default DataCell;
