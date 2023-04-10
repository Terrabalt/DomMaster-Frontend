import React from 'react';
import { ReceiptItem } from '../dataclass';

interface Props {
  item: ReceiptItem;
}
export function ReceiptItemRow({ item }: Props) {
  return (
    <tr>
      <th>{item.description}</th>
      <th>{item.cost.toString()}</th>
      <th>{item.amount}</th>
      <th>{item.totalToString()}</th>
    </tr>
  );
}
