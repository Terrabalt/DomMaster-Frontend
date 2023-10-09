import React, {useState} from 'react';
import { ReceiptItem, Money, ReceiptItemType, ReceiptItemTypes } from '../dataclass';
import MoneyInput from './MoneyInput';
import InputWithValidator, { requiredValidator } from './InputWithValidator';
import withValidator from '../data/withValidator';

interface Props {
  value?: ReceiptItem;
  onAdd: (newItem: ReceiptItem) => void;
}

export default function NewReceiptItemRow({onAdd}: Props) {
  const [description, setDescription] = useState("")
  const [itemType, setItemType] = useState(ReceiptItemTypes[0])
  const [amount, setAmount] = useState(1)
  const [money, setMoney] = useState(new Money())
  
  const [descriptionValid, descriptionValidator] = withValidator([ requiredValidator ], description)
  const [moneyValid, moneyValidator] = withValidator([ requiredValidator ], money.toString())
  const [amountValid, amountValidator] = withValidator([ requiredValidator ], amount)

  const clickAdd = () => {
    if (descriptionValid && moneyValid && amountValid) {
      onAdd(new ReceiptItem("", description, itemType, money, amount))
    }
  }

  return (<>
    <tr>  
      <td>
        <InputWithValidator 
          name="newItemDesc"
          value={description}
          onChange={e => setDescription(e.target.value)}
          validators={[ descriptionValidator ]}
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
        <MoneyInput
          value={money}
          onChange={v => setMoney(v)}
          validators={[ moneyValidator ]}
        />
      </td>
      <td>
        <InputWithValidator
          name="newItemAmount"
          type="number"
          value={amount}
          onChange={e => setAmount(parseInt(e.target.value))}
          validators={[ amountValidator ]}
        />
      </td>
      <td>{money.multiply(amount).toString()}</td>
      <td><button onClick={() => clickAdd()}>Add</button></td>
    </tr>
  </>)
}