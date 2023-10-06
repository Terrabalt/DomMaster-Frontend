import React, { useEffect } from 'react';
import { Receipt, ReceiptItem } from '../dataclass';
import {FormattedDate} from 'react-intl';
import ReceiptItemTable from './ReceiptItemTable';
import DateTimePicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import ReceiptCategoryInput from './ReceiptCategoryInput';
import InputWithValidator, { requiredValidator } from './InputWithValidator';
import withValidator from '../data/withValidator';

interface Props {
    receipt: Receipt;
    onChange?: (newReceipt: Receipt) => void;
    setValid?: (isValid: boolean) => void;
}
export default function ReceiptTable({receipt, onChange, setValid}:Props) {
  function changeItem(items: ReceiptItem[]) {
    if (onChange == undefined) return
    const nReceipt = new Receipt()
    Object.assign(nReceipt, receipt, {items: items})
    onChange(nReceipt)
  }
  function changeDate(date: Date) {
    if (onChange == undefined) return
    const nReceipt = new Receipt()
    Object.assign(nReceipt, receipt, {date: date})
    onChange(nReceipt)
  }
  function changeTitle(title: string) {
    if (onChange == undefined) return
    const nReceipt = new Receipt()
    Object.assign(nReceipt, receipt, {title: title})
    onChange(nReceipt)
  }
  function changeCategory(category: string) {
    if (onChange == undefined) return
    const nReceipt = new Receipt()
    Object.assign(nReceipt, receipt, {category: category})
    onChange(nReceipt)
  }
  if (onChange) {
    const [titleValid, titleValidators] = withValidator([requiredValidator])

    useEffect(() => {
      setValid && setValid(titleValid && receipt.items.length == 0)
    }, [titleValid, receipt.items])

    return (
      <div>
        <div>
          <label>Title:
            <InputWithValidator
              value={receipt.title}
              onChange={(e) => changeTitle(e.target.value)}
              validators={[ titleValidators ]}
            />
          </label>
        </div>
        <div>
          <ReceiptCategoryInput 
            value={receipt.category}
            onChange={(e) => changeCategory(e)}
          />
        </div>
        <div>
          <label>Date:
            <DateTimePicker 
              dayAriaLabel="Day"
              monthAriaLabel="Month"
              yearAriaLabel="Year"
              value={receipt.date}
              onChange={v => { 
                if (v instanceof Date) 
                  changeDate(v as Date)
              }}
            />
          </label>
        </div>
        <ReceiptItemTable receipt={receipt} onChange={changeItem}/>
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <p>{receipt.title || "#00"}</p>
        </div>
        <div>
          <p>Category: {receipt.category || "-"}</p>
        </div>
        <div>
          <FormattedDate value={receipt.date} hour='2-digit' minute='2-digit'/>
        </div>
        <ReceiptItemTable receipt={receipt}/>
      </div>
    )
  }
}
  