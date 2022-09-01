import React, { useState, useEffect } from 'react';
import { getAccessTokenApi } from '../../../api/auth'
import { getAllCultives } from '../../../api/cultivo'
import ListCultivo from '../../../components/Admin/Cultivos/ListCultivos/ListCultivo';

export default function Cultivos() {
    const [ cultivos, setCultivos ] = useState([]);
    const [ reloadCultivos, setReloadCultivos ] = useState(false);

    const token = getAccessTokenApi();

    useEffect(() => {
        getAllCultives(token).then( response => {
            setCultivos(response.cultivos);
        });
        setReloadCultivos(false);
    }, [token, reloadCultivos]);
    
  return (
    <div className='cultivos'>
        <ListCultivo
            cultivos = { cultivos }
            setReloadCultivos = { setReloadCultivos }
        ></ListCultivo>
    </div>
  );
}
