import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Logo from '../../components/logo/Logo';
import FolmondiHero from '../../components/FolmondiHero';
import PrimaryButton from '../../components/buttons/primary-button/PrimaryButton';
import Footer from '../../components/footer/Footer';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <FolmondiHero/>
            <Footer/>
        </div>
    );
};

export default Home;