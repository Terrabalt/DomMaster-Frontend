import React from 'react';
import { Receipt, ReceiptItem } from '../dataclass';
import { ReceiptItemRow } from './ReceiptItemRow';
import NewReceiptItemRow from './NewReceiptItemRow';

interface Props {
    receipt: Receipt;
    onChange?: (newReceiptItems: ReceiptItem[]) => void;
}
export default function ReceiptItemTable({receipt, onChange}:Props) {  
  function deleteItem(i:number) {
    if (onChange == undefined || i < 0 || i >= receipt.items.length) return
    const items = [...receipt.items]
    items.splice(i, 1)
    onChange(items)
  }
  function addNewItem(newItem: ReceiptItem) {
    if (onChange == undefined || newItem.description === "" || newItem.amount === 0 || newItem.total().amount === BigInt(0)) return
    const items = [...receipt.items]
    items.push(newItem)
    onChange(items)
  }
  return (
    <table aria-label="sticky table">  
      <thead>
        <tr>
          <th>Description</th>
          <th>Type</th>
          <th>Cost</th>
          <th>Amount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {
          receipt.items.map((v, i) => (
            <ReceiptItemRow
            item={v}
            key={i}
            onDelete={onChange ? (() => deleteItem(i)) : undefined}/>
          ))
        }
        { onChange?
            <NewReceiptItemRow onAdd={(newItem) => addNewItem(newItem)}/>
          : null
        }
      </tbody>
      <tfoot>
        <tr>
          <th/>
          <th/>
          <th/>
          <th>Total:</th>
          <th>{ receipt.totalToString() }</th>
        </tr>
      </tfoot>
    </table>
  )
}
  