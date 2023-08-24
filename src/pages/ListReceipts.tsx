import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Receipt } from '../dataclass';
import { ReceiptDatabase } from '../data/database';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ReceiptsTable } from '../components/ReceiptsTable';
import Calendar from 'react-calendar';
import { getMonthRange, isDateOnDay } from '../helper/DateHelper';

interface Props {
  database: ReceiptDatabase;
}

function ListReceipts({database} : Props) {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [selectedReceipts, setSelectedReceipts] = useState<Receipt[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date())

  function getMonthReceipts(dateInMonth: Date) {
    setLoading(true)
    database.GetReceipts(getMonthRange(dateInMonth)).then(v => {
      setReceipts(v);
      setLoading(false);
    })
  }
  useEffect(() => {
    const cleanDate = new Date()
    cleanDate.setHours(0, 0, 0, 0)
    getMonthReceipts(cleanDate)
  }, [])
  function onActiveStartDateChanged(newDate: Date) {
    getMonthReceipts(newDate)
  }

  function onDateChange(newDate: Date) {
    if (newDate != date) {
      setDate(newDate);
      setSelectedReceipts(receipts.filter((v) => {
        return isDateOnDay(v.date, newDate)
      }));
    }
  }

  return (
    <div>
      <Calendar
        onChange={(v) => {
          if (v instanceof Date)
            onDateChange(v)
        }}
        onActiveStartDateChange={({activeStartDate}) => {
          if (activeStartDate)
            onActiveStartDateChanged(activeStartDate)
        }}
        tileContent={(v) => {
          if (v.view != 'month') return null;
          const d = receipts.findIndex((value) => isDateOnDay(value.date, v.date))

          if (d > -1) {
          return <div style={{height:'react-calendar__tile'}}>+</div>
          }
          else 
            return <div style={{height:'react-calendar__tile'}}>{"　"}</div>
        }}
        showNeighboringMonth={false}
        value={date}
      />
      { isLoading ?
          <>Loading...</>
        : selectedReceipts.length > 0 ? 
          <div>
            <ReceiptsTable receipts={selectedReceipts}/>
            <Link to={`./add`}>Add new</Link>
          </div> 
        :
          <p>No receipts. <Link to={`./add`}>Add new.</Link></p>
      }
    </div>
  )
}

export default ListReceipts;
