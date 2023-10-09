import React from 'react';
import { Receipt, ReceiptItem } from '../dataclass';
import { ReceiptItemRow } from './ReceiptItemRow';
import NewReceiptItemRow from './NewReceiptItemRow';
import { FormattedMessage } from 'react-intl';

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
          <th>
            <FormattedMessage
              description="receipt-item-description-column"
              defaultMessage="Description" id="vRM+fv"
            />
          </th>
          <th>
            <FormattedMessage
              description="receipt-item-type-column"
              defaultMessage="Type" id="2oZuFm"
            />
          </th>
          <th>
            <FormattedMessage
              description="receipt-item-cost-column"
              defaultMessage="Cost" id="MrNBXp"
            />
          </th>
          <th>
            <FormattedMessage
              description="receipt-item-amount-column"
              defaultMessage="Amount" id="oneaDR"
            />
          </th>
          <th>
            <FormattedMessage
              description="receipt-item-total-column"
              defaultMessage="Total" id="mtguTx"
            />
          </th>
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
          <th>
            <FormattedMessage
              description="receipt-item-row-total"
              defaultMessage="Total:" id="BzC5iZ"
            />
          </th>
          <th>{ receipt.totalToString() }</th>
        </tr>
      </tfoot>
    </table>
  )
}
  