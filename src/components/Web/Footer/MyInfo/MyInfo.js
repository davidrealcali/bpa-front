import React from 'react';
import Logo from "../../../../assets/img/png/datagro_logo.png";

import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className='my-info'>
        <img src={Logo} alt='Cristian David Otalvaro'/>
        <h4> Deja que tu imaginacion fluya xd</h4>
    </div>
  );
}
