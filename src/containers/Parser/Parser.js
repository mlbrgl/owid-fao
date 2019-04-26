import data from "../../data/diet.json";

const ANIMAL = "Animal";
const PLANT = "Plant";
const SUGAR = "Sugar";
const ALCOHOL = "Alcoholic beverages";

const categories = [
  {
    name: ANIMAL,
    items: ["Meat", "Dairy & Eggs"]
  },
  {
    name: PLANT,
    items: [
      "Cereals and Grains",
      "Pulses",
      "Starchy Roots",
      "Fruit and Vegetables"
    ]
  },
  {
    name: SUGAR,
    items: [SUGAR]
  },
  {
    name: ALCOHOL,
    items: [ALCOHOL]
  }
];

const getUniqFromObjectKey = (data, key) => {
  return [...new Set(data.map(dataPoint => dataPoint[key]))];
};
const years = getUniqFromObjectKey(data, "Year");
const countries = getUniqFromObjectKey(data, "Country");

const getCategoryCount = (dataPoint, category) => {
  const count = category.items.reduce((count, item) => {
    return count + dataPoint[item];
  }, 0);
  return count;
};

const getActiveData = (activeCountries, activeCategory) => {
  return countries.map(country => {
    const countryIsActive = activeCountries.indexOf(country) !== -1;
    const countryData = countryIsActive
      ? data
          .filter(dataPoint => dataPoint["Country"] === country)
          .map(dataPoint => {
            return {
              year: dataPoint.Year,
              count: getCategoryCount(dataPoint, activeCategory)
            };
          })
      : null;

    return {
      country: country,
      data: countryData,
      active: countryIsActive
    };
  });
};

const getCategoryBounds = category => {
  let min = getCategoryCount(data[0], category);
  let max = getCategoryCount(data[0], category);

  data.forEach(dataPoint => {
    const count = getCategoryCount(dataPoint, category);
    min = count < min ? count : min;
    max = count > max ? count : max;
  });

  return { min, max };
};

export { countries, categories, years, getActiveData, getCategoryBounds };
