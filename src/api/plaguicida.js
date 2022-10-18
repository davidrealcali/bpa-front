import { basePath } from './config';

export function getAllPlaguicidas ( token ) {
    const url = `${basePath}/plaguicidas`;
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

export function deletePlaguicidas ( token, uid ){
    const url = `${basePath}/plaguicidas/delete-plaguicida/${uid}`;
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

export function updatePlaguicidas ( token, id, data ){
    const url = `${basePath}/plaguicidas/actualizar-plaguicida/${id}`;
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

export function postPlaguicidaApi ( token, data ) {
    const url = `${basePath}/plaguicidas/crear-plaguicida/`;
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

export function postIngredientePlaguicidaApi ( token, data ) {
    const url = `${basePath}/ingredientesPlaguicidas/add/`;
    const params = {
        method: "POST",
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

export function getIngredientePlaguicidaApi( token, id ) {
    const url =  `${basePath}/ingredientesPlaguicidas/get/${id}`;
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
        return result;
    }).catch( err  => {
        return err;
    });
}