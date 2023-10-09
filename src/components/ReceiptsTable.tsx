import React from "react"
import { Receipt } from "../dataclass";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

interface Props {
  receipts: Receipt[];
}
export function ReceiptsTable({receipts} : Props) {
  return (
    <table>
      <caption>
        <FormattedMessage
          description="receipts-table-caption"
          defaultMessage="Receipts" id="MAQLOQ"
        />
      </caption>
      <thead>
        <tr>
          <th>
            <FormattedMessage
              description="receipts-table-title-column"
              defaultMessage="Title" id="/Um7BD"
            />
          </th>
          <th>
            <FormattedMessage
              description="receipts-table-date-column"
              defaultMessage="Date" id="Dh6tvM"
            />
          </th>
          <th>
            <FormattedMessage
              description="receipts-table-total-column"
              defaultMessage="Total" id="poQ2pU"
            />
          </th>
          <th>
            <FormattedMessage
              description="receipts-table-actions-column"
              defaultMessage="Actions" id="9RC+kM"
            />
          </th>
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
              <th>
                <Link to={`./${receipt.id}`}>  
                  <FormattedMessage
                    description="receipts-table-row-view-text-button"
                    defaultMessage="View" id="XM5Ys3"
                  />
                </Link>
              </th>
              <th>
                <Link to={`./${receipt.id}/edit`}>
                  <FormattedMessage
                    description="receipts-table-row-edit-text-button"
                    defaultMessage="Edit" id="AEG4R+"
                  />
                </Link>
              </th>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}