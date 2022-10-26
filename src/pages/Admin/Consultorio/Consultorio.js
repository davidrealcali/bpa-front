import React, { useState, useEffect } from 'react';
import { getAccessTokenApi } from '../../../api/auth';
import { getAllCultives } from '../../../api/cultivo';
import ListConsultorio from '../../../components/Admin/Consultorio/ListConsultorio';

export default function Consultorio() {
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
        <ListConsultorio
            cultivos = { cultivos }
            setReloadCultivos = { setReloadCultivos }
        ></ListConsultorio>
    </div>
  );
}
