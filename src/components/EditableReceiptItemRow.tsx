import React from 'react';
import { ReceiptItem } from '../dataclass';

interface Props {
  item: ReceiptItem;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function EditableReceiptItemRow({ item, onDelete }: Props) {
  return (
    <tr>
      <th>{item.description}</th>
      <th>{item.cost.toString()}</th>
      <th>{item.amount}</th>
      <th>{item.totalToString()}</th>
      <th><button onClick={() => onDelete? onDelete() : {}}>x</button></th>
    </tr>
  );
}
