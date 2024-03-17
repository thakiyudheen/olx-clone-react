import React,{useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import { FirebaseContext, authContext } from './store/FirebaseContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from './postContext/postContext';


function App(props) {
  var {user,setUser}=useContext(authContext)
   const {db}=useContext(FirebaseContext)
  useEffect(()=>{
    const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log('user loged',user)
  if (user) {
    setUser(user)
   }
});
    console.log('this is the context',user)
  })

  
  return (
    <div>
         <Post>
     <Router>
  
        <Routes>
         
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element ={ <Signup/>}/>
          <Route path='/login' element ={ <Login/>}/>
          <Route path='/create' element ={ <Create/>}/>
          <Route path='/view' element ={ <View/>}/>
        </Routes>
      
    </Router>
    </Post>
    </div>
  );
}

export default App;
