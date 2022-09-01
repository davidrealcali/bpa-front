import React,{ useState, useEffect } from 'react'
import { getAccessTokenApi } from '../../../api/auth';
import { getAllPlaguicidas } from '../../../api/plaguicida';
import ListPlaguicidas from '../../../components/Admin/Plaguicidas/ListPlaguicidas';


export default function Plaguicidas() {

  const [ plaguicidas, setPlaguicidas ] = useState([]);
  const [ reloadPlaguicdas, setReloadPlaguicidas ] = useState(false);

  const token = getAccessTokenApi();

  useEffect(() => {
        getAllPlaguicidas(token).then( response => {
            console.log(response.plaguicidas);
            setPlaguicidas(response.plaguicidas);
        });
        setReloadPlaguicidas(false);
  }, [token, reloadPlaguicdas])
  

  return (
    <div className='plaguicidas'>
        <ListPlaguicidas
            plaguicidas={ plaguicidas}
            setReloadPlaguicidas = { setReloadPlaguicidas}
        >     
        </ListPlaguicidas>
    </div>
  )
}
