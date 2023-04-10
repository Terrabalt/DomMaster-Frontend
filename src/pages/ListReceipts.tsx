import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Receipt } from '../dataclass';
import { getReceipts } from '../data/database';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function ListReceipts() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getReceipts().then(v => {
      setReceipts(v);
      setLoading(false)
    })
  }, [])

  if (isLoading) return <>Loading...</>
  return (
    <div>
      <table>
        <caption>Receipts</caption>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Total</th>
            <th>Actions</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {
            receipts.map((receipt, i) => (
              <tr key={receipt.id}>
                <th>{receipt.title}</th>
                <th>{receipt.date.toDateString()}</th>
                <th>
                  {
                  receipt.total()
                    .map(perCurrency => perCurrency.toString())
                    .reduce((p, c) => `${p} + ${c}`)
                  }
                </th>
                <th><Link to={`./${i}`}>View</Link></th>
                <th><Link to={`./${i}/edit`}>Edit</Link></th>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <Link to={`./add`}>Add new</Link>
        </tfoot>
      </table>
    </div>
  )
}

export default ListReceipts;
