import React from 'react';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo-without-bg.png';
import logo3 from '../../assets/bg2.png';
import logo4 from '../../assets/logo2.jpeg';

const Logo = ({width,bg,footer=false}) => {
    return (
        <div>
            <img width={width} src={footer? logo3 :( bg? logo3 : logo4)} alt='logo' />
        </div>
    );
};

export default Logo;