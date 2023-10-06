import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Receipt } from '../dataclass';
import ReceiptTable from '../components/ReceiptTable';

import { ReceiptDatabase } from '../data/database';

interface Props {
  database: ReceiptDatabase;
}

function AddReceipt({database} : Props) {
  const navigate = useNavigate()
  const [receipt, setReceipt] = useState<Receipt>(new Receipt());
  const [isValid, setValid] = useState(false);

  return (
    <div>
      <Link to="..">return</Link>
      <ReceiptTable receipt={receipt} onChange={v => {setReceipt(v)}} setValid={setValid}/>
      <button
        id='finish-add'
        onClick={() => {
          if (!isValid) return;
          database.AddReceipt(receipt).then(()=>{
            navigate(-1);
          })
        }}
      >Finish</button>
    </div>
  )
}

export default AddReceipt;
