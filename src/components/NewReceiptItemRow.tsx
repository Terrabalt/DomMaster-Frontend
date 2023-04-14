import React, {useState} from 'react';
import { ReceiptItem, Money, ReceiptItemType, ReceiptItemTypes } from '../dataclass';
import MoneyInput from './MoneyInput';

interface Props {
  value?: ReceiptItem;
  onAdd: (newItem: ReceiptItem) => void;
}

export default function NewReceiptItemRow({onAdd}: Props) {
  const [description, setDescription] = useState("")
  const [itemType, setItemType] = useState(ReceiptItemTypes[0])
  const [amount, setAmount] = useState(1)
  const [money, setMoney] = useState(new Money())

  return (
    <>
    <tr>
      <th>
        <input 
          name="newItemDesc" 
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </th>
      <th>
        <select
          name="newItemType"
          value={itemType}
          onChange={(e) => setItemType(e.target.value as ReceiptItemType)}
        >
          {
            ReceiptItemTypes.map((v, i) => (
              <option key={i} value={v}>{v}</option>
            ))
          }
        </select>
      </th>
      <th>
        <MoneyInput value={money} onChange={v => setMoney(v)}/>
      </th>
      <th>
        <input
          name="newItemAmount"
          type="number"
          value={amount}
          onChange={e => setAmount(parseInt(e.target.value))}
        />
      </th>
      <th>{money.multiply(amount).toString()}</th>
      <button onClick={() => onAdd(new ReceiptItem("", description, itemType, money, amount))}>Add</button>
    </tr>
    </>
  )
}