import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ReceiptDatabase } from '../data/database';
import { DatabaseContext } from '../data/databaseContext';
import InputWithValidator from './InputWithValidator';
import { ValidatorStack } from '../data/withValidator';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  validators?: ValidatorStack
}

export default function ReceiptCategoryInput({value, onChange, validators = []} : Props) {
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ suggestions, setSuggestions ] = useState<string[]>([]);

  const {database: db, loading: dbLoading} = useContext(DatabaseContext)
  const getSuggestions = useCallback(async (db:ReceiptDatabase) => {
    const response = await db.GetReceiptCategories();
    setSuggestions(response)
  }, [db, dbLoading])

  useEffect(() => {
    if (db && !loading) {
      getSuggestions(db)
    }
    setLoading(false)
  }, [db, dbLoading, getSuggestions])

  return <>
    <label>Category:
      <InputWithValidator
        type="text"
        value={value}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => onChange(e.target.value)}
        validators={validators}
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
  