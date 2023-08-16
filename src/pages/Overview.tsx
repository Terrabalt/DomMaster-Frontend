import React, { useEffect, useState } from 'react';
import { ReceiptDatabase } from '../data/database';
import { Receipt } from '../dataclass';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';

interface Props {
  database: ReceiptDatabase;
}

function Overview({database} : Props) {
  
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date|undefined>(new Date())

  useEffect(() => {
    database.GetReceipts().then(v => {
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
  function onCalendarChangeDate(value: Value) {
    if (value) {
      if (Array.isArray(value)) setSelectedDate(value[0] || value[1] || undefined)
      else setSelectedDate(value)
    }
    
  } 
  if (isLoading) return <>Loading...</>
  return ( 
    <div>
      <p></p>
      <p>This month&apos;s saving: {getSaving()}</p>
      <p>This month&apos;s spending: {getSpending()}</p>
      <hr/>
      <p>
        <Calendar
          onChange={(v) => onCalendarChangeDate(v)}
          value={selectedDate}
        />
      </p>
    </div>
  );
}

export default Overview;
