import React,{useContext, useState} from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseContext } from '../../store/FirebaseContext';
import { collection,addDoc } from 'firebase/firestore/lite';
import {useNavigate} from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate();
  var {db}=useContext(FirebaseContext)
  const [username,setName]=useState('')
  const [email,setEmail]=useState('')
  const [Phone,setPhone]=useState('')
  const [password,setPassword]=useState('')

  const handleSubmit=(e)=>{
    e.preventDefault()
    const auth = getAuth();
    console.log('db',db);
    console.log('this is email',email,password)
    
createUserWithEmailAndPassword(auth, email,password)
  .then(async(userCredential) => {
   
    const user = userCredential.user;
    
    console.log('you are logged',db);
    // console.log('this is user',db)
    addDoc(collection(db,'users'),{
      userId:userCredential.user.uid,
      name:username,
      phone:Phone
      

    }).then(()=>{
      navigate('/login')
    })
   
   
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    
    
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            onChange={(e)=>setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            onChange={(e)=>setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button >Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
