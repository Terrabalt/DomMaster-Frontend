import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ReceiptDatabase } from '../data/database';
import { DatabaseContext } from '../data/databaseContext';
import InputWithValidator from './InputWithValidator';
import { ValidatorStack } from '../data/withValidator';
import { FormattedMessage } from 'react-intl';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  validators?: ValidatorStack
}

export default function ReceiptCategoryInput({value, onChange, validators = []} : Props) {
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [ isLoading, setLoading ] = useState(false);
  const [ suggestions, setSuggestions ] = useState<string[]>([]);

  const {database: db, loading: dbLoading} = useContext(DatabaseContext)
  const getSuggestions = useCallback(async (db:ReceiptDatabase) => {
    const response = await db.GetReceiptCategories();
    setSuggestions(response)
  }, [db, dbLoading])

  useEffect(() => {
    if (db && !isLoading) {
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
          { isLoading ? (
            <div><FormattedMessage description="loading-text" defaultMessage="Loading..." id="gWo/FW" /></div>
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
  