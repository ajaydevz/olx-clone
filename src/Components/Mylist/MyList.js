import React, { useEffect, useState, useContext } from 'react';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './MyList.css';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(
          collection(firebase.db, 'products'),
          where('userID', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const listings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(listings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    if (user) {
      fetchListings();
    }
  }, [user, firebase.db]);


  const handleMyListingsClick = () => {
    // Redirect to appropriate page based on user authentication status
    if (user) {
      navigate('/my-listings');
    } else {
      navigate('/signup'); // Redirect to signup page if user is not logged in
    }
  };


  return (
    <div className="trending-products">
    <h2 style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>My Products</h2>
    <div className="product-list">
      {listings.map((listing) => (
        <div key={listing.id} className="product-item">
          <img src={listing.imageURL} alt={listing.productName} className="product-image" />
          <div className="product-details">
            <h3 className="product-name">{listing.productName}</h3>
            <p className="product-category">Category: {listing.category}</p>
            <p className="product-price">Price: {listing.price}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default MyListings;

