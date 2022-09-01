import { basePath } from './config';

export function getAllIngredientes ( token ) {
    const url = `${basePath}/ingredientes`;
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

export function deleteIngredientes ( token, uid ){
    const url = `${basePath}/ingredientes/delete-ingredientes/${uid}`;
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
        return result;
    }).catch(err => {
        console.log(err);
    }) ;
}

export function updateIngredientes ( token, id, data ){
    console.log('data en api', data);
    console.log('id api', id);
    const url = `${basePath}/ingredientes/actualizar-ingredientes/${id}`;
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

export function postIngredienteApi ( token, data ) {
    const url = `${basePath}/ingredientes/crear-ingrediente/`;
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