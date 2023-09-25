import { Contextapi } from "./Contextapi";
import Left from "./left";
import { useContext, useState } from "react";

function Itemlist() {
    const [selectedCategory, setSelectedCategory] = useState("grocerie");
    const [items, setItems] = useState([]);
    // const [cart, setCart] = useState([]);
    const {cart,setCart}=useContext(Contextapi)
    const [message, setMessage] = useState();

    let _cart={...cart}

    function handleFormSubmit(e) {
        e.preventDefault();
        const data = { selectedCategory };
        fetch('/api/itemfetch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((res) => { return res.json() }).then((data) => {
            // console.log(data)
            if (data.status === 200) {
                setItems(data.apidata);
            } else {
                setMessage(data.message)
            }
        })
    };

    // const addToCart = (item) => {
    //     setCart([...cart, item]);
    // };

    const renderItems = () => {
        if (items.length < 0) {
            return <h6 className="text-center mt-3 ">No items available in this category.</h6>
        }
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, key) => (
                        <tr key={item._id}>
                            
                            <th>{key + 1}</th>
                            <td>
                                <img
                                    src={`/productimages/${item.img}`}
                                    alt='...'
                                    style={{ width: "50px" }}
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.desc}</td>
                            <td>{item.price}</td>
                            <td>{item.qty}</td>

                            <td>
                                <button className="btn btn-primary"
                                onClick={(e)=>{handlecart(e,item)}}
                                >
                                    Add to Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    function handlecart(e,product)
    {
        console.log(product._id)
        console.log(product)
        if(!_cart.item){
            _cart.item={}
        }if(!_cart.item[product._id]){
            _cart.item[product._id]=1
        }else{
            _cart.item[product._id]+=1
        }if(!_cart.totalItems){
            _cart.totalItems=1
        }else{
            _cart.totalItems +=1
        }
        setCart(_cart)
        console.log(cart)
    }
    const renderCart = () => {
        if (cart.length === 0) {
            return <h3 className="text-center">Your cart is empty.</h3>;
        }

        // return (
        //     <div>
        //         <h3 className="text-center">Your Cart:</h3>
        //         <ul >
        //             {cart.map((item, key) => (
        //               <p>{key+1} {item.name}:INR  {item.price}</p>
                     
        //             ))}
        //              <button className="btn btn-info" onClick={(e)=>{handlecart(e,items)}}>Procced</button>
        //         </ul>
        //     </div>
        // );
    };

    return (
        <div className="container">
            <div className="row">
                <Left />
                <div className="col-md-9">
                    <form onSubmit={(e) => { handleFormSubmit(e) }}>
                        <select className="form-select mt-3" value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)} >
                            <option value="grocerie">Groceries</option>
                            <option value="toys">Toys</option>
                            <option value="cosmetics">Cosmetics</option>
                            <option value="electricaplliance">Electric Appliance</option>
                            <option value="decor">Decor</option>
                        </select>
                        <button type="submit" className="form-control mt-2 btn btn-success">Show Items</button>
                    </form>
                    {items.length > 0 ? renderItems() : <h6 className="text-center mt-3 ">No items available in this category.</h6>}


                    {renderCart()}
                </div>
            </div>
        </div>
    );
}

export default Itemlist;