// app/hooks/useCountries.ts
import countries from "world-countries/countries.json"; // Add /countries.json

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  region: country.region,
  latlng: country.latlng
}));

const useCountries = () => {
  const getAll = () => formattedCountries;
  const getByValue = (value: string) => 
    formattedCountries.find((item) => item.value === value);
  
  return { getAll, getByValue };
};

export default useCountries;

