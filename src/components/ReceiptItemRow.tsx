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
      <th>{item.description}</th>
      <th>{item.cost.toString()}</th>
      <th>{item.amount}</th>
      <th>{item.totalToString()}</th>
      {
        onEdit ? (
          <th><button onClick={() => onEdit()}>edit</button></th>
        ) : null
      }
      {
        onDelete ? (
          <th><button onClick={() => onDelete()}>x</button></th>
        ) : null
      }
    </tr>
  );
}
