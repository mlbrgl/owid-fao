import React from "react";
import PropTypes from "prop-types";
import { Table, TableBody } from "semantic-ui-react";
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
            <Table.Row key={countryData.country}>
              <Table.Cell>
                <CountryFilter
                  label={countryData.country}
                  onChangeHandler={props.onChangeCountriesHandler}
                />
              </Table.Cell>
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
                      <Table.Cell
                        key={year}
                        style={{
                          backgroundColor: backgroundColor
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
