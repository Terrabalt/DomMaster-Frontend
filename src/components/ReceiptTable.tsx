import React from 'react';
import { Receipt } from '../dataclass';
import { ReceiptItemRow } from './ReceiptItemRow';
import {FormattedDate} from 'react-intl';

interface Props {
    receipt: Receipt;
}
export default function ReceiptTable({receipt}:Props) {  
    return (
    <div>
      <caption>{receipt.title || "#00"}</caption>
      <FormattedDate value={receipt.date} day='2-digit' month='long' year='numeric'/>
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
  