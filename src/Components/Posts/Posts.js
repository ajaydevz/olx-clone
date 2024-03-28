// Post.js

import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import {   query, where } from "firebase/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../store/Context';


function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext)
  const Navigate = useNavigate()

  useEffect(() => {
    getPosts()
    async function getPosts() {
      // Get posts data from Firebase on page load
      const querySnapshot = await getDocs(collection(firebase.db, "products"));
      const allPosts = querySnapshot.docs.map((doc) => {
        return { // Returning array of products
          id: doc.id, // ID of product document
          ...doc.data(),  // All the fields inside product document
        }
      })
      setProducts(allPosts)
    }
  }, [firebase.db])
  
  const { user } = useContext(AuthContext); 

  const handleAddToWishlist = async (product) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to be logged in to add items to your wishlist.',
      });
      return;
    }
  
    try {
      const wishlistCollection = collection(firebase.db, 'wishlist');
      const wishlistQuery = query(wishlistCollection, where('userId', '==', user.uid), where('productId', '==', product.id));
      const querySnapshot = await getDocs(wishlistQuery);
  
      if (!querySnapshot.empty) {
        // Product already exists in the wishlist
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'This product is already in your wishlist.',
        });
      } else {
        // Add product to the wishlist
        await addDoc(wishlistCollection, {
          userId: user.uid,
          productId: product.id,
          productName: product.productName,
          category: product.category,
          price: product.price,
          imageURL: product.imageURL,
          createdAt: new Date().toDateString(),
        });
  
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Product added to your wishlist.',
        });
  
        // Redirect to wishlist page
        Navigate('/wish');
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add product to your wishlist.',
      });
    }
  };
  

  return (
    <div className="postParentDiv">
      {/* Render product cards */}
      {products.map((product) => {
        return (
          <div className="card mb-4" key={product.id} onClick={() => { setPostDetails(product); Navigate('/view') }}>
            <div className="favorite" onClick={(e) => { e.stopPropagation(); handleAddToWishlist(product); }}>
            <Heart />
            </div>
            <div className="image mb-3">
              <img src={product.imageURL} alt="product" />
            </div>
            <div className="content">
              <h4 >&#x20B9; {product.price}</h4>
              <span className="kilometer">{product.productName}</span>
              <p className="name">{product.category}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
