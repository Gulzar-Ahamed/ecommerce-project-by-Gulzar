import React from 'react'
import Announcement from './Announcement';
import Footer from './Footer';
import NavigationBar from './NavigationBar';
import NewComponent from './NewComponent';
import NewsLetter from './NewsLetter';
import Products from './productFolder/Products';

function ProductList() {  // this is a temporary file to display
    return (
        <>
        <NavigationBar />
        <Announcement />

        <NewComponent />  {/** this is a new component to be added in this stuff */}
        
        <Products />
        <NewsLetter />
        <Footer />
        </>
    )
}

export default ProductList;
