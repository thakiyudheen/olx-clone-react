import React, { Fragment,useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, authContext } from '../../store/FirebaseContext';
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { collection,addDoc } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';


const Create = () => {
  const {db}=useContext(FirebaseContext)
  const {user}=useContext(authContext)
  const navigator=useNavigate()

  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState('')
  const date=new Date()
      
  const handleSubmit = async () => {
    const spaceRef = ref(getStorage(), `images/${image.name}`);
  
    try {
      const snapshot = await uploadBytes(spaceRef, image);
      const url = await getDownloadURL(spaceRef);
  
      console.log('this is the url', url);
  
       addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        url,
        userId: user.uid,
        createdAt: new Date().toDateString()
      }).then(()=>{
        navigator('/')
      })
  
      console.log('Product added successfully!');
    } catch (error) {
      console.error('Error uploading image or adding product:', error);
    }
  }
      
    
     
      // const handleSubmit = async () => {
      //   const spaceRef = ref(getStorage(), `images/${image.name}`);
      
      //   uploadBytes(spaceRef,image).then((snapshot)=>{
      //    getDownloadURL(spaceRef).then(async(url)=>{
      //      console.log('this is the url', url);
      //     await addDoc.collection(db,'products',{
      //       name,
      //       category,
      //       price,
      //       url,
      //       userId:user.uid,
      //       createdAt:date.toDateString()
      //      })
      //    })
      //   })

      // }
     
    


       

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" onChange={(e)=>setPrice(e.target.value)} />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          
            <br />
            <input type="file"  onChange={(e)=>setImage(e.target.files[0])}/>
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
