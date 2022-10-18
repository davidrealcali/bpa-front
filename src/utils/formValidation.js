import jwt_decode from "jwt-decode";
import { notification } from "antd";
import { getRefreshTokenApi } from "../api/auth";
/* eslint-disable no-useless-escape */
export function minLengthValidation( inputData, minLength) {
    const { value } = inputData;

    removeClassErrorSuccess( inputData );

    if ( value.length >= minLength ){
        inputData.classList.add('success');
        return true;
    } else {
        inputData.classList.add("error");
        return false;
    }
}

export function emailValidation( inputData ) {
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { value } = inputData;

    removeClassErrorSuccess( inputData );

    const resultValidation = emailValid.test(value);
    if ( resultValidation ){
        inputData.classList.add("success");
        return true;
    } else {
        inputData.classList.add("error");
        return false;
    }
}

function removeClassErrorSuccess( inputData ){
    inputData.classList.remove('success');
    inputData.classList.remove("error");
}

export function decodeRolJWT( token ) {
   // const tokenAct = getRefreshTokenApi(token);
    let { id, rol, email } = jwt_decode(token);
    const estado = rol === "ADMIN_ROLE" ? true : false;
    const mensaje = `El usuario ${email} no tiene permisos para realizar esta acción`;
    return { id, estado, mensaje };
}
