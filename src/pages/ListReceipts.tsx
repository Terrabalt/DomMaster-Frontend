import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Receipt } from '../dataclass';
import { getReceipts } from '../data/database';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ReceiptsTable } from '../components/ReceiptsTable';

function ListReceipts() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getReceipts().then(v => {
      setReceipts(v);
      setLoading(false)
    })
  }, [])

  if (isLoading) return <>Loading...</>
  return (
    <div>
      { receipts.length > 0 ? 
        <div>
          <ReceiptsTable receipts={receipts}/>
          <Link to={`./add`}>Add new</Link>
        </div> 
      :
        <p>No receipts. <Link to={`./add`}>Add new.</Link></p> 
      }
    </div>
  )
}

export default ListReceipts;
