import React from "react"
import { Receipt } from "../dataclass";
import { Link } from "react-router-dom";

interface Props {
  receipts: Receipt[];
}
export function ReceiptsTable({receipts} : Props) {
  return (
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
                receipt.totalToString()
                }
              </th>
              <th><Link to={`./${i}`}>View</Link></th>
              <th><Link to={`./${i}/edit`}>Edit</Link></th>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}