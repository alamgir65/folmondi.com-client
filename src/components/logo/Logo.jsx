import React from 'react';
import logo from '../../assets/logo.png';

const Logo = ({width,height}) => {
    return (
        <div>
            <img width={width} src={logo}></img>
        </div>
    );
};

export default Logo;