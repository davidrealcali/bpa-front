import React, { useState, useEffect } from 'react';
import { getAccessTokenApi } from '../../../api/auth';
import { getAllIngredientes } from "../../../api/ingrediente";
import ListIngredientes from '../../../components/Admin/Ingredientes/ListIngredientes';

export default function Ingredientes() {
    const [ ingredientes, setIngredientes ] = useState([]);
    const [ reloadIngredientes, setReloadIngredientes ] = useState(false);

    const token = getAccessTokenApi();

    useEffect(() => {
        getAllIngredientes(token).then( response => {
            setIngredientes(response.ingredientes );
        });
        setReloadIngredientes(false);
    }, [token, reloadIngredientes]);
    
  return (
    <div className='cultivos'>
        <ListIngredientes
            ingredientes = { ingredientes }
            setReloadIngredientes = { setReloadIngredientes }
        ></ListIngredientes>
    </div>
  );
}
