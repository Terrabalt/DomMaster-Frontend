import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Receipt, ReceiptAssign } from '../dataclass';
import ReceiptTable from '../components/ReceiptTable';

import { ReceiptDatabase } from '../data/database';
import { FormattedMessage } from 'react-intl';

interface Props {
  database: ReceiptDatabase;
}

function AddReceipt({database} : Props) {
  const navigate = useNavigate()
  const [receipt, setReceipt] = useState<Receipt>(ReceiptAssign({ date: useLocation().state?.date as Date || new Date() }));
  const [isValid, setValid] = useState(false);

  return (
    <div>
      <Link to="..">
        <FormattedMessage
          description="goback-text-button"
          defaultMessage="Return" id="909D/G"
        />
      </Link>
      <ReceiptTable receipt={receipt} onChange={v => {setReceipt(v)}} setValid={setValid}/>
      <button
        id='finish-add'
        onClick={() => {
          if (!isValid) return;
          database.AddReceipt(receipt).then(()=>{
            navigate(-1);
          })
        }}
      >
        <FormattedMessage
          description="finish-button"
          defaultMessage="Finish" id="nZE/Ow"
        />
      </button>
    </div>
  )
}

export default AddReceipt;
