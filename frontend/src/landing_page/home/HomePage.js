import React from 'react';
import Hero from './Hero';
// import Awards from './Awards';
import Education from './Education';
import OpenAccount from '../OpenAccount';
import Stats from './Stats';
import Pricing from './Pricing';
import Navbar from '../Navbar';
import Footer from '../footer';

function HomePage() {
    return ( 
    <>
   
    <Hero/>
    {/* <Awards/> */}
    <Stats  />
    <Pricing/>
    <Education/>
    <OpenAccount/>
    

    </>
     );
}

export default HomePage;