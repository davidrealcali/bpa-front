import { basePath } from "./config";

export function getPostsApi( limit, page ) {
    const url = `${basePath}/post/get-posts?limit=${limit}&page=${page}`;

    return fetch(url)
        .then( response => {
            return response.json();
        }).then( result => {
            return result;
        }).catch( err => {
            return err;
        });
};

export function deletePostApi( token, id ) {
    const url = `${basePath}/post/delete-post/${id}`;

    const params = {
        method: "DELETE",
        headers : {
            "Content-Type" : "application/json",
            Authorization: token
        }
    };

    return fetch ( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result;
    }).catch( err => {
        return err;
    });
}

export function addPostApi( token, post ) {
    const url = `${basePath}/post/add-post`;
    const params = {
        method: "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization: token
        },
        body : JSON.stringify(post)
    };

    return fetch( url, params )
        .then( response => {
            return response.json();
        }).then( result => {
            return result;
        }).catch( err => {
            return err;
        });
}

export function updatePostApi( token , id, data ) {
    const url = `${basePath}/post/update-post/${id}`;

    const params = {
        method: "PUT",
        headers : {
            "Content-Type" : "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }

    return fetch( url, params ).then( response => {
        return response.json();
    }).then( result => {
        return result;
    }).catch( err => {
        return err;
    });
    
}

export function getPostApi(urlPost) {
    const url = `${basePath}/post/get-post/${urlPost}`;
  
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
  }