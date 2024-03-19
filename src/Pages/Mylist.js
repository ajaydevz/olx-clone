import React from 'react'
import MyListings from '../Components/Mylist/MyList'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'


function Mylist() {
  return (
    <div>
      <Header />
        <MyListings />
      <Footer />
    </div>
  )
}

export default Mylist
