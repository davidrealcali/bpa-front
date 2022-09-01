import { basePath } from './config';

export function getMenuApi( token ) {
    const url = `${basePath}/menu/get-menus`;
    const params = {
        method: "GET",
        headers : {
            "Content-Type": "application/json",
            Authorization: token
        }
    }
    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result;
    }).catch( err => {
        return err.message;
    }) ;
}

export function updateMenuApi( token, menuId, data ) {
    console.log(data);
    const url = `${basePath}/menu/update-menu/${menuId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body : JSON.stringify(data)
    };

    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result.message;
    }).catch( err => {
        return err;
    });
}

export function activeMenuApi( token, menuId, status ) {
    const url = `${basePath}/menu/active-menu/${menuId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body : JSON.stringify( { active: status } )
    };

    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result.message;
    }).catch( err => {
        console.log(err);
    });
}

export function addMenuApi( token, menu ) {
    const url = `${basePath}/menu/add-menu`;
    const params = {
        method: "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization: token
        },
        body : JSON.stringify(menu)
    };

    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result;
    }).catch( err => {
        return err;
    });
}

export function deleteMenuApi ( token, menuId ) {
    const url = `${basePath}/menu/delete-menu/${menuId}`;
    const params = {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            Authorization: token
        }  
    };

    return fetch ( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result.message
    }).catch( err => {
        return err;
    });
}