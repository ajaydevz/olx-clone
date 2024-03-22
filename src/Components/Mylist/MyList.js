import React, { useEffect, useState, useContext } from 'react';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import './MyList.css';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

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


  const handleDelete = async (id) => {
    try {
      // Delete the product document from Firestore
      await deleteDoc(doc(firebase.db, 'products', id));
      // Update the listings state to reflect the deletion
      setListings(listings.filter(listing => listing.id !== id));

      
    } catch (error) {
      console.error('Error deleting product:', error);
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
            <div className="product-actions">
                <button style={{background:"lightblue"}} >Edit</button>
                <button style={{background:"red"}} onClick={() => handleDelete(listing.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default MyListings;

