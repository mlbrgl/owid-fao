import React from "react";
import PropTypes from "prop-types";
import CountryFilter from "../CountryFilter/CountryFilter";
import styles from "./Heatmap.module.css";
import DataCell from "../DataCell/DataCell";

const Heatmap = props => {
  const sortedData = [...props.data].sort(
    (countryDataA, countryDataB) => +countryDataB.active - +countryDataA.active
  );
  const colorPrefix = `rgba(${props.backgroundColor.join(",")},`;

  return (
    <table className={styles.table}>
      <tbody>
        {sortedData.map(countryData => {
          return (
            <tr className={styles.row} key={countryData.country}>
              <td className={styles.countryFilter}>
                <CountryFilter
                  label={countryData.country}
                  onChangeHandler={props.onChangeCountriesHandler}
                  active={countryData.active}
                />
              </td>
              {countryData.active
                ? props.years.map(year => {
                    const countArr = countryData.data
                      .filter(data => data.year === year)
                      .map(data => data.count);

                    const backgroundColor = countArr.length
                      ? colorPrefix +
                        (((countArr[0] - props.bounds.min) * 0.8) /
                          (props.bounds.max - props.bounds.min) +
                          0.2) +
                        ")"
                      : "lightgrey";
                    return (
                      <DataCell
                        key={year}
                        backgroundColor={backgroundColor}
                        content={`${year}: ${countArr[0]} kcal`}
                      />
                    );
                  })
                : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

Heatmap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          year: PropTypes.number.isRequired,
          count: PropTypes.number.isRequired
        })
      ),
      active: PropTypes.bool.isRequired
    })
  ).isRequired,
  bounds: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }).isRequired,
  onChangeCountriesHandler: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
  backgroundColor: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Heatmap;
