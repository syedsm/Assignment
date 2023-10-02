import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import { Link } from "react-router-dom";

function Cart() {
    const { cart, setCart, loginname } = useContext(Contextapi)
    const [product, setProducts] = useState([])
    const [message, setmessage] = useState()

    let totalamount = 0

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
            // console.log(cartdata)
            // console.log(cartdata.apidata)
            if (cartdata.status === 200) {
                // const singlearray = Object.values(cartdata.apidata).flat();
                setProducts(cartdata.apidata);
            } else {
                setmessage(cartdata.message)
            }
        })
    }, [cart.item])

    function handlequan(id) {
        // let quantity = cart.items[id]
        // return quantity
        return cart.item[id]
    }

    function handleincrement(e, id, qty) {
        let currentqty = handlequan(id)
        if (qty === currentqty) {
            alert('Product Reached Maximum limit')
            return
        }
        let _cart = { ...cart }
        _cart.item[id] = currentqty + 1
        _cart.totalItems += 1
        setCart(_cart)


    }
    function handledecre(e, id) {
        let currentqty = handlequan(id)
        if (currentqty === 1) {
            return
        }
        let _cart = { ...cart }
        _cart.item[id] = currentqty - 1
        _cart.totalItems -= 1
        setCart(_cart)

    }

    function handleprice(id, price) {
        let currentprice = handlequan(id) * price
        totalamount += currentprice
        return currentprice
    }

    // useEffect(()=>{

    //     // Calculate the total amount whenever product or cart.item changes
    //     let calculatedTotalAmount = 0;
    //     product.forEach((item) => {
    //         calculatedTotalAmount += handlequan(item._id) * item.price;
    //     });
    //     setTotalAmount(calculatedTotalAmount);
    // },[cart.item,product])


    function handledelete(e, id) {
        let current_qnty = handlequan(id)
        console.log("current_qnty:", current_qnty)
        let _cart = { ...cart }
        delete _cart.item[id]
        _cart.totalItems -= current_qnty
        setCart(_cart)
    }

    return (
        <>
            {product.length ?
            <section id="tab">
                <table className="table table-hover" >
                    <thead>
                        <tr>
                            {/* <th>S.NO</th> */}
                            <th>Product Image</th>
                            <th>Product name</th>
                            <th>Product Description</th>
                            <th>Product Quantity</th>
                            <th>Product Price</th>
                            <th></th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((item, index) => (
                            <tr >
                                <td><img src={`../productimages/${item.img}`} alt="..." style={{ width: "100px" }} /></td>
                                <td>{item.name}</td>
                                <td>{item.desc}</td>
                                <td>{item.qty}</td>
                                <td>{handleprice(item._id, item.price)}</td>

                                <td><button onClick={(e) => { handleincrement(e, item._id, item.qty) }}>+</button>{handlequan(item._id)}<button onClick={(e) => { handledecre(e, item._id) }}>-</button></td>
                                <td><button onClick={(e) => { handledelete(e, item._id) }} className="btn btn-info"><i class="bi bi-x-lg"></i></button></td>

                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7"><h4 className="text-center">Total Amount: {totalamount} <i class="bi bi-currency-rupee"></i></h4></td>
                        </tr>
                        <tr>
                            <td colSpan="7"><Link to={`/billprint?productIds=${product.map((item) => item._id).join(",")}`}><button className="btn btn-warning form-control"> Checkout</button></Link></td>
                        </tr>
                    </tbody>
                </table>
                </section>

                :
                <img src="7612-removebg-preview.png" style={{ width: "50%" }} className="img-fluid rounded mx-auto d-block " alt="..." />
            }
        </>

    );
}

export default Cart;