import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";

function Cart() {
    const { cart, setCart, loginname } = useContext(Contextapi)
    const [product, setProducts] = useState({})
    const [message, setmessage] = useState()
    
    // console.log(cart.item)
    useEffect(() => {
        if (!cart.item) {
            return
        }
        fetch('/api/cartproducts', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: Object.keys(cart.item) })
        }).then((result) => { return result.json() }).then((cartdata) => {
            console.log(cartdata)
            // console.log(cartdata.apidata)
            if (cartdata.status === 200) {
                setProducts(cartdata.apidata)
            } else {
                setmessage(cartdata.message)
            }
        })
    }, [cart.item])
    

    return (
        <>
        
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>product name</th>
                        <th>product Image</th>
                        <th>product Quantity</th>
                        <th>product Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((products, index) => (
                        <tr >
                            <td>{index + 1}</td>
                            <td>{products._id}</td>
                            <td>{products.name}</td>
                            <td>{products.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Cart;