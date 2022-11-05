import { basePath } from './config';

export function getAllCultives ( token ) {
    const url = `${basePath}/cultivos`;
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

export function deleteCultives ( token, uid ){
    const url = `${basePath}/cultivos/delete-cultive/${uid}`;
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

export function updateCultives ( token, id, data ){
    const url = `${basePath}/cultivos/actualizar-cultivo/${id}`;
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

export function postCultiveApi ( token, data ) {
    const url = `${basePath}/cultivos/crear-cultivo/`;
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

export async function getDataByCultive( token, id ) {
    const url = `${basePath}/probleCulPlagui/getDataByCultivo/${id}`;
    const params = {
        method:"GET",
        headers : {
            "Content-Type" : "application/json",
             Authorization: token
        }
    }
    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result
    }).catch( err  => {
        return err;
    });
}

export function getPlaguicidaByProblema( token, id, id2 ){
    const url = `${basePath}/probleCulPlagui/getDataByProblema/${id}/${id2}`;
    const params = {
        method:"GET",
        headers : {
            "Content-Type" : "application/json",
             Authorization: token
        }
    }
    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result
    }).catch( err  => {
        return err;
    });
}