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
          <th>Time</th>
          <th>Total</th>
          <th>Actions</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        {
          receipts.map((receipt) => (
            <tr key={receipt.id}>
              <th>{receipt.title}</th>
              <th>{receipt.date.toLocaleTimeString()}</th>
              <th>
                {
                receipt.totalToString()
                }
              </th>
              <th><Link to={`./${receipt.id}`}>View</Link></th>
              <th><Link to={`./${receipt.id}/edit`}>Edit</Link></th>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}