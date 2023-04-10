import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Receipt } from '../dataclass';
import { getReceipt } from '../data/database';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ReceiptTable from '../components/ReceiptTable';

function ViewReceipt() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [receipt, setReceipt] = useState<Receipt>(new Receipt());
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getReceipt(Number(id)).then(v => {
      setReceipt(v);
      setLoading(false)
    })
  }, [])

  if (isLoading) return <>Loading...</>
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
