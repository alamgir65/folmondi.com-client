import React from 'react';
import logo from '../../assets/logo.png';

const Logo = ({width}) => {
    return (
        <div>
            <img width={width} src={logo} alt='logo' />
        </div>
    );
};

export default Logo;