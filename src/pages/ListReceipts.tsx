import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Receipt } from '../dataclass';
import { ReceiptDatabase } from '../data/database';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ReceiptsTable } from '../components/ReceiptsTable';
import Calendar from 'react-calendar';

interface Props {
  database: ReceiptDatabase;
}

function getMonthRange(date: Date) : [Date, Date] {  
  const startDate = new Date(date)
  startDate.setDate(1)
  const endDate = new Date(date)
  endDate.setMonth(endDate.getMonth() + 1)
  endDate.setDate(0)
  return [startDate, endDate]
}

function isDateOnDay(date:Date, day:Date) : boolean {
  const startDay = new Date(day)
  startDay.setHours(0,0,0,0)
  const endDay = new Date(day)
  endDay.setHours(23,59,59,999)
  return date >= startDay && date <= endDay
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
      console.log(selectedReceipts)
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
