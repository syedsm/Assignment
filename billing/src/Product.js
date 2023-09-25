import { Link } from "react-router-dom";
import Left from "./left";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";


function Product() {
  const [item, setitem] = useState([''])
  const [message, setmessage] = useState([''])
  const{cart,setCart}=useContext(Contextapi)

  let _cart={...cart}


  useEffect(() => {
    fetch('/api/allitem')
      .then((result) => { return result.json() }).then((data) => {
        // console.log(data)
        if (data.status === 200) {
          setitem(data.apiData)
        } else {
          setmessage(data.message)
        }
      })
  }, [])
  function handlecart(e,data)
    {
        // console.log(data._id)
        console.log(data)
        if(!_cart.item){
            _cart.item={}
        }if(!_cart.item[data._id]){
            _cart.item[data._id]=1
        }else{
            _cart.item[data._id]+=1
        }if(!_cart.totalItems){
            _cart.totalItems=1
        }else{
            _cart.totalItems +=1
        }
        setCart(_cart)
        console.log(_cart)
    }
  return (
    <>
      <section id="item" >
      <div className="container mt-3 ">
                <div className="row justify-content-center">
                  <Left/>
                    <div className="col-md-9 ">
                      <h2 className="text-center">Item List </h2>
                      <Link to='/itemadd'> <button className="form-control mb-2  btn btn-success">  Add Item </button></Link>
                      {item.map((data,key)=>(

                        <div className="card d-inline-block me-4 shadow p-3 bg-body-rounded" style={{ width: "18rem" }}>
                            <img src={`../productimages/${data.img}`} className="card-img-top" style={{ width: '100%' }} alt="..." />
                            <div className="card-body">
                                <h5 className="card-title"> {data.name}</h5>
                                <p className="card-text">{data.desc}</p>
                                <p className="card-text"> Price :<i class="bi bi-currency-rupee"></i>{data.price}</p>
                                <Link to="" className="btn btn-success mb-2"style={{marginLeft:'20px'}} onClick={(e)=>handlecart(e,data)}>Add Cart </Link>
                                <Link to="" className="btn btn-primary" style={{marginLeft:'20px'}} >More Details</Link>

                            </div>
                        </div>
                      ))}
                    </div>
                </div>
            </div>

      </section>
    </>
  );
}


export default Product;