import React, { useEffect, useState } from 'react';
import { getReceipts } from '../data/database';
import { Receipt } from '../dataclass';

function Overview() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getReceipts().then(v => {
      if (v.length > 0) {
        const currDate = new Date()
        const thisMonthReceipts = v.filter(val => 
          val.date.getMonth() == currDate.getMonth() 
          && val.date.getFullYear() == currDate.getFullYear()
          )
        setReceipts(thisMonthReceipts);
      }
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
      }, new Receipt(undefined, undefined, []))
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
      }, new Receipt(undefined, undefined, []))
        .totalToString()
      : "none!";
  }
  if (isLoading) return <>Loading...</>
  return ( 
    <div>
      <p></p>
      <p>This month&apos;s saving: {getSaving()}</p>
      <p>This month&apos;s spending: {getSpending()}</p>
    </div>
  );
}

export default Overview;
