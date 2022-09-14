import "./App.css";
import { useState } from "react";
var createHost = require("cross-domain-storage/host");
var createGuest = require("cross-domain-storage/guest");

var storageHost = createHost([
  {
    origin: "https://mirats-2.netlify.app",
    allowedMethods: ["get", "set", "remove"],
  },
  {
    origin: "https://mirats-1.netlify.app",
    allowedMethods: ["get"],
  },
]);

function App() {
  const [localValue, setLocalValue] = useState("");
  const [crossDomainValue, setCrossDomainValue] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <p> Cross Doamin Storage</p>
        <input
          placeholder="Enter your value"
          onChange={(e) => {
            setLocalValue(e.target.value);
          }}
          value={localValue}
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            localStorage.setItem("localStorageKey", localValue);
            setLocalValue("");
          }}
        >
          {" "}
          Save to Storage
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            var bazStorage = createGuest(
              window.location.href === "https://mirats-1.netlify.app/"
                ? "https://mirats-2.netlify.app"
                : "https://mirats-1.netlify.app/"
            );
            bazStorage.get("localStorageKey", function (error, value) {
              // value for the key of 'fizz' will be retrieved from localStorage on www.baz.com
              if (error) {
                console.log(error);
              } else {
                setCrossDomainValue(value);
              }
            });
          }}
        >
          {" "}
          Access Storage{" "}
        </button>
        <p>
          Value Stored from current: {localStorage.getItem("localStorageKey")}
        </p>
        <p>Value Stored from cross current: {crossDomainValue}</p>
      </header>
    </div>
  );
}

export default App;
