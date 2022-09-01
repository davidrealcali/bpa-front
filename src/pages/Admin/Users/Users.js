import React, { useState, useEffect } from 'react';
import "./Users.scss";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersApi, getAllUsersApi} from '../../../api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers';

export default function Users() {

    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers ] = useState(false);

    const token = getAccessTokenApi();
    
    useEffect(() => {
        getAllUsersApi(token, true).then( response => {
            setUsersActive(response.usuarios)
        });
        getAllUsersApi(token, false).then( response => {
            setUsersInactive(response.usuarios)
        })
        setReloadUsers(false);
    }, [token, reloadUsers] );

    return (
        <div className='users'>
            <ListUsers usersActive={ usersActive} 
                       usersInactive={ usersInactive }
                       setReloadUsers={setReloadUsers} />
        </div>
    )
}