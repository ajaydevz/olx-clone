import React, { useEffect, useState, useContext } from 'react';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
import './Wish.css'; // Import the CSS file for styling

const Wishlist = () => {
  const [wishlists, setWishlists] = useState([]);
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        if (user) {
          const q = query(
            collection(firebase.db, 'wishlist'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(q);
          const wishlists = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setWishlists(wishlists);
        }
      } catch (error) {
        console.error('Error fetching wishlists:', error);
      }
    };

    fetchWishlists();
  }, [user, firebase.db]);

  const removeFromWishlist = async (wishlistItemId) => {
    try {
      await deleteDoc(doc(firebase.db, 'wishlist', wishlistItemId));
      setWishlists(wishlists.filter(item => item.id !== wishlistItemId));
      console.log(`Wishlist item with ID ${wishlistItemId} removed`);
    } catch (error) {
      console.error('Error removing wishlist item:', error);
    }
  };


  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {wishlists.length > 0 ? (
        wishlists.map((wishlist) => (
          <div key={wishlist.id} className="wishlist-item">
            <img src={wishlist.imageURL} alt={wishlist.productName} />
            <h3>{wishlist.productName}</h3>
            <p>Category: {wishlist.category}</p>
            <p>Price: {wishlist.price}</p>
            <div className="wishlist-buttons">
              <button onClick={() => removeFromWishlist(wishlist.id)}>Remove </button>
              {/* Add button for adding to cart */}
              <button>AddCart</button>
            </div>
          </div>
        ))
      ) : (
        <p>No items in your wishlist.</p>
      )}
    </div>
  );
};

export default Wishlist;