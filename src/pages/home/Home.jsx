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
            <FolmondiHero />
            <Products />
            <div className="flex justify-center mb-2 sm:mb-4">
                <button className="btn-primary w-full sm:w-auto">
                    View All Products →
                </button>
            </div>
            <ReviewSection />
        </div>
    );
};

export default Home;