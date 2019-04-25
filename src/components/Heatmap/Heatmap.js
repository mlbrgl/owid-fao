import React from "react";
import PropTypes from "prop-types";
import { Table, TableBody } from "semantic-ui-react";
import styles from "./Heatmap.module.css";
import CountryFilter from "../CountryFilter/CountryFilter";

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
    <Table>
      <TableBody>
        {sortedData.map(countryData => {
          return (
            <Table.Row key={`${countryData.country}-${props.category}`}>
              <Table.Cell>
                <CountryFilter
                  label={countryData.country}
                  onChangeHandler={props.onChangeCountriesHandler}
                />
              </Table.Cell>
              {countryData.active
                ? props.years.map(year => {
                    const count = countryData.data
                      .filter(data => data.year === year)
                      .map(data => data.count);
                    return (
                      <Table.Cell
                        key={`${countryData.country}-${year}-${props.category}`}
                        style={{
                          backgroundColor: perc2color(
                            count,
                            props.min,
                            props.max
                          )
                        }}
                      />
                    );
                  })
                : null}
            </Table.Row>
          );
        })}
      </TableBody>
    </Table>
  );
};

Heatmap.propTypes = {};

export default Heatmap;
