import React,{ useState, useEffect } from 'react'
import { getAccessTokenApi } from '../../../api/auth';
import { getAllIngredientes } from '../../../api/ingrediente';
import { getAllPlaguicidas } from '../../../api/plaguicida';
import ListPlaguicidas from '../../../components/Admin/Plaguicidas/ListPlaguicidas';


export default function Plaguicidas() {

  const [ plaguicidas, setPlaguicidas ] = useState([]);
  const [ ingredientes, setIngredientes ] = useState([]);
  const [ reloadPlaguicdas, setReloadPlaguicidas ] = useState(false);
  const [ reloadIngredientes, setReloadIngredientes] = useState(false);

  const token = getAccessTokenApi();

  useEffect(() => {
        getAllPlaguicidas(token).then( response => {
            setPlaguicidas(response.plaguicidas);
        });
        setReloadPlaguicidas(false);
  }, [token, reloadPlaguicdas]);

  useEffect(() => {
      getAllIngredientes(token).then( response => {
          setIngredientes(response.ingredientes)
      });
      setReloadIngredientes(false);
  }, [token, reloadIngredientes ]);
  return (
    <div className='plaguicidas'>
        <ListPlaguicidas
            plaguicidas={ plaguicidas}
            setReloadPlaguicidas={ setReloadPlaguicidas}
            setReloadIngredientes={ setReloadIngredientes }
            ingredientes={ingredientes}
        >     
        </ListPlaguicidas>
    </div>
  )
}
