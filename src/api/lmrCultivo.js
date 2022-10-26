import { basePath } from './config';

export function getAllLmrCultivos ( token ) {
    const url = `${basePath}/lmrCultivos/getLmr`;
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

export function deleteCultiveLmr ( token, uid ){
    const url = `${basePath}/lmrCultivos/lmrDelete/${uid}`;
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

export function updateCultiveLmr ( token, id, data ){
    const url = `${basePath}/lmrCultivos/lmrUpdate/${id}`;
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