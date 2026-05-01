import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Logo from '../../components/logo/Logo';
import FolmondiHero from '../../components/FolmondiHero';
import PrimaryButton from '../../components/buttons/primary-button/PrimaryButton';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <FolmondiHero/>
            <PrimaryButton/>
        </div>
    );
};

export default Home;