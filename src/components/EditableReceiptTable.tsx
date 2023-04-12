import React from 'react';
import { Receipt, ReceiptItem } from '../dataclass';
import { EditableReceiptItemRow } from './EditableReceiptItemRow';
import NewReceiptItemRow from './NewReceiptItemRow';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

interface Props {
    receipt: Receipt;
    onChange: (newReceipt: Receipt) => void;
}
export default function EditableReceiptTable({receipt, onChange}:Props) {  
    function deleteItem(i:number) {
      const items = [...receipt.items]
      items.splice(i, 1)
      onChange(new Receipt(receipt.id, receipt.title, items, receipt.date))
    }
    function addNewItem(newItem: ReceiptItem) {
      if (newItem.description === "" || newItem.amount === 0 || newItem.total().amount === BigInt(0)) return
      const items = [...receipt.items]
      items.push(newItem)
      onChange(new Receipt(receipt.id, receipt.title, items, receipt.date))
    }
    function changeDate(date: Date) {
      onChange(new Receipt(receipt.id, receipt.title, receipt.items, date));
    }
    function changeTitle(title: string) {
      onChange(new Receipt(receipt.id, title, receipt.items, receipt.date));
    }
              
    return (
    <div>
      <h2>New Receipt</h2>
      <div>
        <label>Title:
          <input value={receipt.title} onChange={(e) => changeTitle(e.target.value)}/>
        </label>
      </div>
      <div>
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
      </div>
      <table aria-label="sticky table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Cost</th>
            <th>Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
            {
              receipt.items.length > 0 ? 
                receipt.items.map((v, i) => (
                  <EditableReceiptItemRow item={v} key={i} onDelete={() => deleteItem(i)}/>
                ))
              : null
            }
            <NewReceiptItemRow onAdd={(newItem) => addNewItem(newItem)}/>
            <tr>
              <th />
              <th />
              <th>Total:</th>
              <th>{
                receipt.items.length > 0 ?
                  receipt.total()
                    .map(v => v.toString())
                    .reduce((p, c) => `${p} + ${c}`)
                  : '-'
              }</th>
            </tr>
        </tbody>
      </table>
    </div>
    );
  }
  