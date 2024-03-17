import React,{useContext,useEffect,useState} from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getDocs,collection } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';
import { postContext } from '../../postContext/postContext';



function Posts() {
 const {db}=useContext(FirebaseContext)
 let [products,setProduct]=useState([])
 const {  setPostDetails } = useContext(postContext);
 const navigate=useNavigate()

 useEffect(() => {
  
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProduct(productsData)
      console.log('this is products',products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  fetchData();
}, [db,]);

useEffect(()=>{
  console.log('this is pro',products);
},[products])
 
 
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>


        <div className="cards">

          {products.map(el=>{
            return(
              <div
              className="card" 
              onClick={() => { setPostDetails(el); navigate('/view'); }}
            >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={el.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {el.price}</p>
              <span className="kilometer">{el.category}</span>
              <p className="name"> {el.price}</p>
            </div>
            <div className="date">
              <span>{el.createdAt}</span>
            </div>
          </div>)
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
