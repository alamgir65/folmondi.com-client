import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Logo from '../../components/logo/Logo';
import FolmondiHero from '../../components/FolmondiHero';
import PrimaryButton from '../../components/buttons/primary-button/PrimaryButton';
import Footer from '../../components/footer/Footer';
import MobileMenuBar from '../../components/mobile-menu/MobileMenuBar';
import Products from '../../components/products/Products';
import ReviewSection from '../../components/review/ReviewSection';

const Home = () => {
    return (
        <div>
            <FolmondiHero/>
            <Products/>
            <ReviewSection/>
        </div>
    );
};

export default Home;