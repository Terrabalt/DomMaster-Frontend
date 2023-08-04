import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Receipt } from '../dataclass';

import { ReceiptDatabase } from '../data/database';
import ReceiptTable from '../components/ReceiptTable';

interface Props {
  database: ReceiptDatabase;
}

export default function EditReceipt({database} : Props) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [receipt, setReceipt] = useState<Receipt>(new Receipt());
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    database.GetReceipt(Number(id)).then(v => {
      setReceipt(v);
      setLoading(false)
    })
  }, [])

  if (isLoading) return <>Loading...</>
  return (
    <div>
      <Link to="..">return</Link>
      <ReceiptTable receipt={receipt} onChange={v => {setReceipt(v)}}/>
      <button
        id='finish-edit'
        onClick={() => {
          if (receipt.title.trim() == "" || receipt.items.length == 0) return;
          database.UpdateReceipt(Number(id), receipt).then(()=>{
            navigate(-1);
          })
        }}
      >Finish</button>
    </div>
  )
}
