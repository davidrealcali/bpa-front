import { basePath } from './config';

export function signUpApi( data ) {
    const url = `${basePath}/usuarios`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers : {
            "Content-Type": "application/json"
        }
    };

return  fetch( url, params ).then ( response => {
        return response.json()
    }).then ( result => {
        
          if( result.usuario ) {
              return {
                  ok: true, message: "Usuario creado correctamente"
              }
          }
          return {
              ok: false, message : result.errors[0]['msg']
          }
    })
    .catch( () => {
        return {
            ok: false, message : 'Error de servidor, intente mas tarde'
        }
    });
} 

export function signInApi( data ) {
    const url = `${basePath}/auth/login`;
    const params = {
        method: "POST",
        body: JSON.stringify( data ),
        headers : {
            "Content-Type" : "application/json"
        }
    };

    return fetch ( url, params )
            .then( response => {
                return response.json();
            })
            .then( result => {
                console.log(result);
                if( result) {
                    return result;
                }
                return {
                    msg: result.msg
                }
            })
            .catch ( err => {
                return err;
            });
}

export function getUsersApi ( token ) {
    const url = `${basePath}/usuarios`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            Authorization : token,
        }
    };

    return fetch ( url, params )
                .then( response => {
                    return response.json()
                })
                .then( result => {
                    return result;
                })
                .catch( err => {
                    return err.message
                });

}

export function getAllUsersApi ( token, status ) {
    const url = `${basePath}/usuarios/getAll?estado=${status}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            Authorization : token,
        }
    };

    return fetch ( url, params )
                .then( response => {
                    return response.json()
                })
                .then( result => {
                    return result;
                })
                .catch( err => {
                    return err.message
                });
}

export function uploadAvatarApi ( token, avatar, userId ) {
    const url = `${basePath}/usuarios/upload-avatar/${userId}`;
    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name );

    const params = {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: token
        }
    }

    return fetch( url, params)
    .then ( response => {
        return response.json();
    }).then( result => {
        return result;
    }).catch ( err => {
        return err.message;
    });
}

export function getAvatarApi ( avatarName ) {
    const url = `${basePath}/usuarios/get-avatar/${avatarName}`;

    return fetch ( url ).then( response => {
        return response.url;
    }).catch( err => {
        return err.message;
    });
}

export function updateUserApi ( token , user , userId ) {
    const url = `${basePath}/usuarios/update-user/${userId}`;

    const params = {
        method : "PUT",
        headers: {
            "Content-Type" :"application/json",
            Authorization: token
        },
        body : JSON.stringify( user )
    }

    return fetch ( url, params).then( response => {
        return response.json();
    }).then( result => {
        return result;
    }).catch( err => {
        return err.message;
    });
}

export function activateUserApi( token, userId, status ) {
    const url = `${basePath}/usuarios/active-user/${userId}/${status}`;
    const params = {
        method:"PUT",
        headers :{
            Authorization: token
        }
    };

    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result.message;
    }).catch( err => {
        return err.message
    });
}

export function deleteUserApi ( token , userId ) {  
    const url = `${basePath}/usuarios/delete-user/${userId}`;
    const params = {
        method : "DELETE",
        headers : {
            Authorization: token
        }
    };

   return fetch ( url, params ).then ( response => {
        return response.json();
    }).then( result => {
        return result.message;
    }).catch( err => {
        return err.message;
    });
}

export  function signUpAdminApi ( token , user ) {
    const url = `${basePath}/usuarios/create-user`;
    const params = {
        method: "POST",
        headers : {
            "Content-Type":"application/json",
            Authorization: token
        },
        body: JSON.stringify( user )
    }

    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return `Se creo el usuario ${result.user.correo} con exito`;
    }).catch( err => {
        return err.message;
    });
}