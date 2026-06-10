import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Logo from '../../components/logo/Logo';
import FolmondiHero from '../../components/FolmondiHero';
import PrimaryButton from '../../components/buttons/primary-button/PrimaryButton';
import Footer from '../../components/footer/Footer';
import MobileMenuBar from '../../components/mobile-menu/MobileMenuBar';
import Products from '../../components/products/Products';
import ReviewSection from '../../components/review/ReviewSection';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div>
            <FolmondiHero />
            <Products />
            <div className="flex justify-center mt-10 mb-2 sm:mb-4">
                <Link to={'/shop'} className="btn-primary sm:w-auto">
                    View More Products →
                </Link>
            </div>
            <ReviewSection />
        </div>
    );
};

export default Home;