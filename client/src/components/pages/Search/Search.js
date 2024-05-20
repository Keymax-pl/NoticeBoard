import React, { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchPhrase.trim()) {
      navigate(`/search/${searchPhrase}`);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-3 mb-5">
      <div>
        <InputGroup>
          <Form.Control
            className="shadow-none"
            type="text"
            placeholder="search phrase..."
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
          <Button variant="success" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default Search;
