import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Receipt } from '../dataclass';
import EditableReceiptTable from '../components/EditableReceiptTable';

import { getReceipt, updateReceipt } from '../data/database';

export default function EditReceipt() {
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
      <EditableReceiptTable receipt={receipt} onChange={v => {setReceipt(v)}}/>
      <button
        id='finish-edit'
        onClick={() => {
          if (receipt.title.trim() == "" || receipt.items.length == 0) return;
          updateReceipt(Number(id), receipt).then(()=>{
            navigate(-1);
          })
        }}
      >Finish</button>
    </div>
  )
}
