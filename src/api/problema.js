import { basePath } from './config';

export function getAllProblemas ( token ) {
    const url = `${basePath}/problemas`;
    const params = {
        method : "GET",
        headers : {
            "Content-Type" : "json/application",
            Authorization : token
        }
    };

    return fetch ( url, params).then( response => {
        return response.json();
    }).then( result => {
        return result;
    }).catch( err => {
        console.log(err);
    }) 
}

export function deleteProblemas( token, uid ){
    const url = `${basePath}/problemas/delete-problemas/${uid}`;
    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        console.log(result);
        return result;
    }).catch(err => {
        console.log(err);
    }) ;
}

export function updateProblemas ( token, id, data ){
    const url = `${basePath}/problemas/actualizar-problemas/${id}`;
    const params = {
        method: "PUT",
        headers :{
            "Content-Type":"application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }
    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result.message;
    }).catch( err => {
        return err;
    });
}

export function postProblemaApi ( token, data ) {
    const url = `${basePath}/problemas/crear-problema/`;
    const params = {
        method:"POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization: token
        },
        body : JSON.stringify(data)
    }

    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result.message
    }).catch( err  => {
        return err;
    });
}