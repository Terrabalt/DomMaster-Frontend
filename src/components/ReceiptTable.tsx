import React from 'react';
import { Receipt, ReceiptItem } from '../dataclass';
import {FormattedDate} from 'react-intl';
import ReceiptItemTable from './ReceiptItemTable';
import DateTimePicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

interface Props {
    receipt: Receipt;
    onChange?: (newReceipt: Receipt) => void;
}
export default function ReceiptTable({receipt, onChange}:Props) {  
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
  return (
    <div>
    { onChange? (
      <label>Title:
        <input value={receipt.title} onChange={(e) => changeTitle(e.target.value)}/>
      </label>
    ) : (
      <p>{receipt.title || "#00"}</p>
    )}
    { onChange? (
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
    ) : (
      <FormattedDate value={receipt.date} hour='2-digit' minute='2-digit'/>
    )
    }
      <ReceiptItemTable receipt={receipt} onChange={onChange ? changeItem : undefined}/>
    </div>
  )
}
  