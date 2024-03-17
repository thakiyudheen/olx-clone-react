import React, { useState,useContext,useEffect } from 'react';
import { collection, query, where, getDocs ,getFirestore} from 'firebase/firestore';
import './View.css';
import { postContext } from '../../postContext/postContext';
import { FirebaseContext } from '../../store/FirebaseContext';


function View() {
  const [userData,setUserData]=useState('')
  const {postDetails} =useContext(postContext);
  const {db}=useContext(FirebaseContext)
  useEffect(()=>{
    console.log('details',postDetails)
    const {userId}=postDetails
    const fetchData = async () => {
      console.log('db',db)
      const q = query(collection(getFirestore(), 'users'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      setUserData(...querySnapshot.docs.map(doc=>doc.data())); // Assuming there's only one document per user ID
      
    };
   

    fetchData();
  },[db,postDetails])
  useEffect(()=>{
    console.log('final ' ,userData);
  })
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span> {postDetails.name}</span>
          <p> {postDetails.category}</p>
          <span>{postDetails.consolecreatedAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userData.name}</p>
          <p>{userData.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
