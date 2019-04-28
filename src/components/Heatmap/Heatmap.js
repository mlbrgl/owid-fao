import React from "react";
import PropTypes from "prop-types";
import CountryFilter from "../CountryFilter/CountryFilter";
import styles from "./Heatmap.module.css";
import DataCell from "../DataCell/DataCell";

const Heatmap = props => {
  //https://gist.github.com/mlocati/7210513
  function perc2color(perc, min, max) {
    var base = max - min;

    if (base === 0) {
      perc = 100;
    } else {
      perc = ((perc - min) / base) * 100;
    }
    var r,
      g,
      b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  }

  const sortedData = [...props.data].sort(
    (countryDataA, countryDataB) => +countryDataB.active - +countryDataA.active
  );

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
                      ? perc2color(
                          countArr[0],
                          props.bounds.min,
                          props.bounds.max
                        )
                      : "lightgrey";

                    return (
                      <DataCell
                        key={year}
                        backgroundColor={backgroundColor}
                        content={`${year}: ${countArr[0]}`}
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
  years: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Heatmap;
