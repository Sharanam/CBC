import { useEffect, useState } from "react";

import Input from "../Input";
import "./searchAutocomplete.css";

function getFiltered(data, query) {
  return data.filter(
    (suggestion) => suggestion.toLowerCase().indexOf(query) > -1
  );
}

// example:
// <SearchAutocomplete
//           data={["08849", "59582", "76413"]}
//           // data={[
//           //   { id: 1, name: "shara" },
//           //   { id: 2, name: "nam" },
//           //   { id: 3, name: "carh" },
//           //   { id: 4, name: "tera" },
//           // ]}
//           displayable="name"
//           handleCallback={(value) => {
//             alert(JSON.stringify(value));
//           }}
//         />

const SearchAutocomplete = ({
  data,
  displayable,
  handleCallback,
  style,
  placeholder,
  tabIndex,
  injected,
  autoFocus,
}) => {
  let concernedData = data;

  // if (typeof data[0] === "object") {
  //   concernedData = data.map((ele) => ele[displayable]);
  // } else {
  //   concernedData = data;
  // }
  const doCallback = (selectedValue) => {
    let callbackValue;
    if (typeof data[0] === "object") {
      callbackValue =
        data[data.findIndex((ele) => ele[displayable] === selectedValue)];
    } else {
      callbackValue = selectedValue;
    }
    handleCallback(callbackValue);
  };
  const unsafeHandle = () => {
    if (typeof data[0] !== "object") {
      handleCallback(value);
    }
  };
  const [suggestions, setSuggesstions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(injected || value);
  }, [injected]);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 0) {
      const filterSuggestions = getFiltered(concernedData, query);
      setSuggesstions(filterSuggestions);
      setSuggestionIndex(0);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    setSuggesstions([]);
    setSuggestionIndex(0);
    setValue(e.target.innerText);
    setSuggestionsActive(false);
    doCallback(e.target.innerText);
    // due to asynchronous updation of state,
    // I cannot use value in synchronized method
  };

  // const handleOver = (e) => {
  //   setSuggestionIndex(
  //     suggestions.findIndex((ele) => ele[displayable] === e.target.innerText)
  //   );
  // };
  const handleKeyDown = (e) => {
    if (!suggestionsActive) {
      return;
    }
    //UP Arrow
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    //Down Arrow
    if (e.keyCode === 40) {
      if (suggestionIndex === suggestions.length - 1) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    //Enter
    if (e.keyCode === 13) {
      e.preventDefault();
      setValue(suggestions[suggestionIndex]);
      doCallback(suggestions[suggestionIndex]);
      setSuggesstions(0);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
      return;
    }

    // Backspace
    if (e.keyCode === 13) {
      unsafeHandle();
    }
  };

  const Suggestions = () => {
    return (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
              // onMouseOut={(e) => {
              //   setSuggestionIndex(
              //     suggestions.findIndex((ele) => ele === e.target.innerText)
              //   );
              // }}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="autocomplete">
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setSuggestionsActive(false);
          unsafeHandle();
        }}
        style={{ ...style }}
        placeholder={placeholder}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
      />
      {suggestionsActive && <Suggestions />}
    </div>
  );
};

export default SearchAutocomplete;
