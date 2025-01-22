import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
            <Navbar></Navbar>
            <div className='pt-16'>
                <Outlet></Outlet>
            </div>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;