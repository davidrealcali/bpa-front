import React, { useState, useEffect } from 'react';
import { getAccessTokenApi } from '../../../api/auth';
import { getAllProblemas } from '../../../api/problema';
import ListProblema from '../../../components/Admin/Problemas/ListProblemas/ListProblema';

export default function Problemas() {
    const [ problemas, setProblemas ] = useState([]);
    const [ reloadProblemas, setReloadProblemas ] = useState(false);

    const token = getAccessTokenApi();

    useEffect(() => {
      getAllProblemas(token).then( response => {
        setProblemas( response.problemas);
      });
      
      setReloadProblemas(false);
    }, [token, reloadProblemas])
    

  return (
    <div className='problemas'>
        <ListProblema
            problemas={ problemas }
            setReloadProblemas = { setReloadProblemas}
        >
        </ListProblema>
    </div>
  )
}


