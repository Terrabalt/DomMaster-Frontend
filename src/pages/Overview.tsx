import React, { useEffect, useState } from 'react';
import { ReceiptDatabase } from '../data/database';
import { Receipt } from '../dataclass';
import { getMonthRange } from '../helper/DateHelper';
import { FormattedMessage } from 'react-intl';
import { AppIntl } from '../App';

interface Props {
  database: ReceiptDatabase;
}

function Overview({database} : Props) {
  
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    database.GetReceipts(getMonthRange(new Date)).then(v => {
      setReceipts(v);
      setLoading(false)
    })
  }, [])
  function getSaving() : string {
    return receipts.length > 0 ? 
      receipts.reduce((concat, next) => {
        concat.items = concat.items.concat(
          next.items.filter(v => 
            v.type == "credit"
          )
        )
        return concat
      }, new Receipt())
      .totalToString()
      : AppIntl.formatMessage({ id:"w6M3HD", description:"overview-empty-text", defaultMessage:"none!" });
  }
  function getSpending() : string {
    return receipts.length > 0 ? 
      receipts.reduce((concat, next) => {
        concat.items = concat.items.concat(
          next.items.filter(v => 
            v.type == "debit"
          )
        )
        return concat
      }, new Receipt()
      ).totalToString()
      : AppIntl.formatMessage({ id:"w6M3HD", description:"overview-empty-text", defaultMessage:"none!" });
  }
  if (isLoading) return <><FormattedMessage description="loading-text" defaultMessage="Loading..." id="gWo/FW" /></>
  return ( 
    <div>
      <p />
      <p>
        <FormattedMessage
          id="5PbCMn"
          description="saving-text"
          defaultMessage="This month's saving: {saving}"
          values={{saving:getSaving()}}
        />
      </p>
      <p>
        <FormattedMessage
          id="IBp5wg"
          description="spending-text"
          defaultMessage="This month's spending: {spending}"
          values={{spending:getSpending()}}
        />
      </p>
      <hr/>
    </div>
  );
}

export default Overview;
