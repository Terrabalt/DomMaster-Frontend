import React from 'react';
import { Receipt, ReceiptItem } from '../dataclass';
import {FormattedDate} from 'react-intl';
import DatePicker from 'react-date-picker';
import ReceiptItemTable from './ReceiptItemTable';

interface Props {
    receipt: Receipt;
    onChange?: (newReceipt: Receipt) => void;
}
export default function ReceiptTable({receipt, onChange}:Props) {  
  function changeItem(items: ReceiptItem[]) {
    if (onChange == undefined) return
    onChange(new Receipt(receipt.id, receipt.title, items, receipt.date))
  }
  function changeDate(date: Date) {
    if (onChange == undefined) return
    onChange(new Receipt(receipt.id, receipt.title, receipt.items, date));
  }
  function changeTitle(title: string) {
    if (onChange == undefined) return
    onChange(new Receipt(receipt.id, title, receipt.items, receipt.date));
  }
  return (
    <div>
    { onChange? (
      <label>Title:
        <input value={receipt.title} onChange={(e) => changeTitle(e.target.value)}/>
      </label>
    ) : (
      <caption>{receipt.title || "#00"}<br/></caption>
    )
    }
    { onChange? (
      <label>Date:
        <DatePicker
          calendarAriaLabel="Toggle calendar"
          dayAriaLabel="Day"
          monthAriaLabel="Month"
          nativeInputAriaLabel="Date"
          value={receipt.date}
          onChange={date => { 
            if (date) 
              changeDate(date as Date)
          }}
          yearAriaLabel="Year"
        />
      </label>
    ) : (
      <FormattedDate value={receipt.date} day='2-digit' month='long' year='numeric'/>
    )
    }
      <ReceiptItemTable receipt={receipt} onChange={onChange ? changeItem : undefined}/>
    </div>
  )
}
  