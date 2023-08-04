import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Receipt } from '../dataclass';
import { ReceiptDatabase } from '../data/database';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ReceiptTable from '../components/ReceiptTable';

interface Props {
  database: ReceiptDatabase;
}

function ViewReceipt({database} : Props) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [receipt, setReceipt] = useState<Receipt | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    database.GetReceipt(Number(id)).then(v => {
      setReceipt(v);
      return undefined
    }, e => {
      return e
    }).then(() => {
      setLoading(false)
    })
  }, [])

  if (isLoading) return <>Loading...</>
  if (receipt === undefined) return <Navigate to="/error"/>
  return (
    <div>
      <Link to="..">return</Link>
      <ReceiptTable receipt={receipt}/>
      <button
        id='start-edit'
        onClick={() => {
          navigate('./edit');
        }}
      >Edit</button>
    </div>
  )
}

export default ViewReceipt;
