import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Receipt } from '../dataclass';
import EditableReceiptTable from '../components/EditableReceiptTable';

import { addReceipt } from '../data/database';

function AddReceipt() {
  const navigate = useNavigate()
  const [receipt, setReceipt] = useState<Receipt>(new Receipt());
  
  return (
    <div>
      <Link to="..">return</Link>
      <EditableReceiptTable receipt={receipt} onChange={v => {setReceipt(v)}}/>
      <button
        id='finish-add'
        onClick={() => {
          addReceipt(receipt).then(()=>{
            navigate(-1);
          })
        }}
      >Finish</button>
    </div>
  )
}

export default AddReceipt;
