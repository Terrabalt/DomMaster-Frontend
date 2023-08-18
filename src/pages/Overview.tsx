import React, { useEffect, useState } from 'react';
import { ReceiptDatabase } from '../data/database';
import { Receipt } from '../dataclass';

interface Props {
  database: ReceiptDatabase;
}

function Overview({database} : Props) {
  
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    database.GetReceipts().then(v => {
      const currDate = new Date()
      const thisMonthReceipts = v.filter(val => 
        val.date.getMonth() == currDate.getMonth() 
        && val.date.getFullYear() == currDate.getFullYear()
        )
      setReceipts(thisMonthReceipts);
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
      : "none!";
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
      : "none!";
  }
  if (isLoading) return <>Loading...</>
  return ( 
    <div>
      <p></p>
      <p>This month&apos;s saving: {getSaving()}</p>
      <p>This month&apos;s spending: {getSpending()}</p>
      <hr/>
    </div>
  );
}

export default Overview;
