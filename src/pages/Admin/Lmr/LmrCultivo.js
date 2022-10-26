import React,{ useState, useEffect } from 'react'
import { getAccessTokenApi } from '../../../api/auth';
import { getAllLmrCultivos } from '../../../api/lmrCultivo';
import ListLmrCultivo from '../../../components/Admin/Lmr/ListLmrCultivo';

import "./LmrCultivo.scss";

export default function LmrCultivo() {
  const [ lmrCultivos, setLmrCultivos ] = useState([]);
  const [ reloadLmrCultivos, setReloadLmrCultivos ] = useState(false);

  const token = getAccessTokenApi();

  useEffect(() => {
    getAllLmrCultivos(token).then( response => {
        setLmrCultivos(response.lmrCultivo)
    });
    setReloadLmrCultivos(false);
  }, [token, reloadLmrCultivos]);
  
  return (
    <div className='lmrCultivos'>
        <ListLmrCultivo
          lmrCultivo={lmrCultivos}
          setReloadLmrCultivos={setReloadLmrCultivos}
          reloadLmrCultivos={reloadLmrCultivos}
        >

        </ListLmrCultivo>
    </div>
  )
}
