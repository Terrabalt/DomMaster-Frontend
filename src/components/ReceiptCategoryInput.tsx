import React, { useState } from 'react';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

export default function ReceiptCategoryInput({value, onChange} : Props) {
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [ loading, _setLoading ] = useState(false);
  const [ suggestions, _setSuggestions ] = useState<string[]>(["TODO", "TODO2"]);

  return <>
    <label>Category:
      <input
        type="text"
        value={value}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => onChange(e.target.value)}
      />
      { showDropdown && (
        <div>
          { loading ? (
            <div>Loading...</div>
          ) : (suggestions && suggestions.length > 0) ? (
            <>
              {suggestions.map((suggestion, index) => (
                <div
                  key={"d_" + index}
                  className="d_item"
                  onClick={() => onChange(suggestion)}
                />
              ))}
            </>
          ) : (
            <div className="d_none">No suggestions found</div>
          )}
        </div>
      )}
    </label>
  </>
}
  