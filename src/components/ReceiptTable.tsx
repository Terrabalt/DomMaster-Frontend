import React from 'react';
import { Receipt } from '../dataclass';
import { ReceiptItemRow } from './ReceiptItemRow';
import DatePicker from 'react-date-picker';

interface Props {
    receipt: Receipt;
}
export default function ReceiptTable({receipt}:Props) {  
    return (
    <div>
      <DatePicker
        disabled = {true}
        disableCalendar = {true}
        calendarAriaLabel="Toggle calendar"
        dayAriaLabel="Day"
        monthAriaLabel="Month"
        nativeInputAriaLabel="Date"
        value={receipt.date}
        yearAriaLabel="Year"
      />
      <table aria-label="sticky table">
        <caption>Receipt {receipt.title || "#00"}</caption>
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
            receipt.items.map((v, i) => (
              <ReceiptItemRow item={v} key={i}/>
            ))
          }
        </tbody>
        <tfoot>
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
        </tfoot>
      </table>
    </div>
    );
  }
  