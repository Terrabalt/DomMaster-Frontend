import React, {useState} from 'react';
import { ReceiptItem, Money } from '../dataclass';
import MoneyInput from './MoneyInput';

interface Props {
  value?: ReceiptItem;
  onAdd: (newItem: ReceiptItem) => void;
}

export default function NewReceiptItemRow({onAdd}: Props) {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState(0)
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
      <button onClick={() => onAdd(new ReceiptItem("", description, money, amount))}>Add</button>
    </tr>
    </>
  )
}