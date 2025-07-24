import { useState } from "react";

function SearchNote({onSearch}) {

  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  return (
    <div className="mb-4  d-flex">
      <input
        type="text"
        className="form-control me-3 border-primary"
        placeholder="Search notes..."
        value={keyword}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchNote;
