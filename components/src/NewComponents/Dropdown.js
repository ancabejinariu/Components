import React, { useEffect, useState } from "react";
import "./Dropdown.css";

function Dropdown() {
  const [show, toggleHandler] = useState(false);
  const [selected, handleSelectedOption] = useState("");
  const [books, loadBooks] = useState([]);

  useEffect(() => {
    fetch(
      "https://jsonblob.com/api/jsonBlob/bb8f3226-73ff-11ea-9b18-6b2444a4301b"
    )
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          loadBooks(data);
          handleSelectedOption(data[0].id);
        }
      });
  }, []);

  if (books === [] || selected === "") {
    return null;
  }
  var option = books.find(object => object.id === selected);
  console.log(books, selected, option);
  const divs = books.map(object => (
    <div
      key={object.id}
      onClick={() => handleSelectedOption(object.id)}
      className={`option ${selected === object.id ? "selected" : ""}`}
    >
      {object.value}
    </div>
  ));

  return (
    <div className="dropdown-content">
      <div className="default-option" onClick={() => toggleHandler(!show)}>
        {option.value}
        <i className={`fas fa-angle-${show ? "up" : "down"}`} />
      </div>
      <br />
      {show ? (
        <div onClick={() => toggleHandler(!show)} className="dropdown-list">
          {divs}
        </div>
      ) : null}
    </div>
  );
}

export default Dropdown;

