import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Receipt } from '../dataclass';
import ReceiptTable from '../components/ReceiptTable';

import { addReceipt } from '../data/database';

function AddReceipt() {
  const navigate = useNavigate()
  const [receipt, setReceipt] = useState<Receipt>(new Receipt());
  
  return (
    <div>
      <Link to="..">return</Link>
      <ReceiptTable receipt={receipt} onChange={v => {setReceipt(v)}}/>
      <button
        id='finish-add'
        onClick={() => {
          if (receipt.title.trim() == "" || receipt.items.length == 0) return;
          addReceipt(receipt).then(()=>{
            navigate(-1);
          })
        }}
      >Finish</button>
    </div>
  )
}

export default AddReceipt;
