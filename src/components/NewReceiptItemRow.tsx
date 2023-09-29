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
      <td>
        <input 
          name="newItemDesc" 
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </td>
      <td>
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
      </td>
      <td>
        <MoneyInput value={money} onChange={v => setMoney(v)}/>
      </td>
      <td>
        <input
          name="newItemAmount"
          type="number"
          value={amount}
          onChange={e => setAmount(parseInt(e.target.value))}
        />
      </td>
      <td>{money.multiply(amount).toString()}</td>
      <td><button onClick={() => onAdd(new ReceiptItem("", description, itemType, money, amount))}>Add</button></td>
    </tr>
    </>
  )
}