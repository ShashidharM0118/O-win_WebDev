import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../Components/Navbar/Navbar'; // Import your Navbar component
import Footer from '../../Components/Footer/Footer'; // Import your Footer component

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This will render the nested route components */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
