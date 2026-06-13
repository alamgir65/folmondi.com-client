import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import MobileMenuBar from '../components/mobile-menu/MobileMenuBar';
import { Outlet } from 'react-router';
import Marque from '../components/marque/Marque';
import ScrollToTop from '../components/scroll/ScrollToTop';

const ClientLayout = () => {
    return (
        <div>
            <ScrollToTop/>
            <Navbar/>
            <Outlet/>
            <Footer/>
            <MobileMenuBar/>
        </div>
    );
};

export default ClientLayout;