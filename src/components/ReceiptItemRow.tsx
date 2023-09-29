import React from 'react';
import { ReceiptItem } from '../dataclass';

interface Props {
  item: ReceiptItem;
  onEdit?: () => void;
  onDelete?: () => void;
}
export function ReceiptItemRow({ item, onEdit, onDelete }: Props) {
  return (
    <tr>
      <td>{item.description}</td>
      <td>{item.type}</td>
      <td>{item.cost.toString()}</td>
      <td>{item.amount}</td>
      <td>{item.totalToString()}</td>
      {
        onEdit ? (
          <td><button onClick={() => onEdit()}>edit</button></td>
        ) : null
      }
      {
        onDelete ? (
          <td><button onClick={() => onDelete()}>x</button></td>
        ) : null
      }
    </tr>
  );
}
