import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import customFetch from "../utils/customFetch";
import { useSubmit } from "react-router-dom";

const AsyncReactSelect = ({ onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const loadOptions = async (params, callback) => {
    console.log(params);
    try {
      const { data } = await customFetch.get("/destinations/search", {
        params,
      });

      const { searchDestinations } = data;

      const options = searchDestinations.map((destination) => ({
        label: `${destination.name}, ${destination.country}`,
        value: destination._id,
      }));
      callback(options);
    } catch (error) {
      console.error("Error fetching data: ", error);
      callback([]);
    }
  };

  const handleInputChange = (inputValue) => {
    return new Promise((resolve) => {
      loadOptions({ input: inputValue }, resolve);
    });
  };

  const handleChange = (option) => {
    setSelectedValue(option);
    onValueChange(option.value);
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={handleInputChange}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        onChange={handleChange}
        placeholder="Search for a location..."
        value={selectedValue}
      />
    </div>
  );
};

export default AsyncReactSelect;
