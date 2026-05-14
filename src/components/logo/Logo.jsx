import React from 'react';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo-without-bg.png';

const Logo = ({width,bg}) => {
    return (
        <div>
            <img width={width} src={bg? logo : logo2} alt='logo' />
        </div>
    );
};

export default Logo;