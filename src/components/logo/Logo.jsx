import React from 'react';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo-without-bg.png';
import logo3 from '../../assets/bg.png';

const Logo = ({width,bg,footer=false}) => {
    return (
        <div>
            <img width={width} src={footer? logo3 :( bg? logo : logo2)} alt='logo' />
        </div>
    );
};

export default Logo;