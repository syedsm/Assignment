import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { Contextapi } from "./Contextapi";
import Header from "./Header";
import Footer from "./Footer";

function Billing({ hideHeaderFooter }) {
    const [message, setMessage] = useState()
    const [item, setItem] = useState([])
    const { cart, setcart, loginname } = useContext(Contextapi)
    let totalamount = 0


    // Initialize the searchParams object
    const [searchParams] = useSearchParams();

    // Get the value of the 'productIds' query parameter
    const productIds = searchParams.get('productIds');
    const productIdsArray = productIds ? [productIds] : [];

    // Now 'productIds' contains the value of the 'productIds' query parameter
    // console.log(productIds);
    useEffect(() => {

        fetch('/api/billing', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productIdsArray: productIds })
        }).then((res) => { return res.json() }).then((data) => {
            // console.log(data)
            if (data.status === 200) {
                setItem(data.apidata)
            } else {
                setMessage(data.message);
            }
        });

    }, [])
    function handlePrint() {
        window.print()
    }
    function handlequan(id) {
        return cart.item[id]
    }
    function currentdate() {
        const currentdate = new Date();
        return currentdate.toLocaleDateString();
    }
    console.log(Math.round(Math.random() * 10))

    function totalprice(id, price) {
        let currentprice = handlequan(id) * price
        return currentprice

    }
    function handleprice(id, price) {
        let currentprice = handlequan(id) * price
        totalamount += currentprice
        return currentprice
    }

    // Calculate the product total amount
    function TotalAmount(items) {
        let total = 0;
        let gst = 0;
        for (let i = 0; i < items.length; i++) {
            const itemTotal = totalprice(items[i]._id, items[i].price);
            total += itemTotal;


            // Assuming GST rate is 18%, you can adjust it as needed
            const itemGST = (itemTotal * 8) / 100;
            gst += itemGST;
        }
        return { total, gst };
    }
    // Calculate the product total amount and GST
    const { total: productTotalAmount, gst: totalGST } = TotalAmount(item);
    // const producttotalamount = TotalAmount(item);
    let amount = 0

    const randomInvoiceNumber = Math.floor(Math.random() * 900000) + 100000;
    return (
        <>
        {/* {!hideHeaderFooter && (
            <>
                <Header />
                <Footer />
            </>
        )} */}


        <div className="container">


            <div className="row">
                <h1 className="text-center mt-2 mb-3">Invoice </h1>

                <div className="col-md-12">
                    
                    {message ? (
                        <p>{message}</p>
                    ) : (
                        <>
                            <h4 style={{ float: "right" }}>Date:{currentdate()}</h4>

                            <div className="col-md-3 "><h5>Invoice Number:{randomInvoiceNumber}</h5>
                            </div>

                            <table className="table table-hover mt-4 table-bordered border-dark" >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>

                                </thead>
                                <tbody   >
                                    {item.map((product, key) => (

                                        <tr key={product._id} >
                                            <td>{key + 1}</td>
                                            <td>{product.name}</td>
                                            <td> <i class="bi bi-currency-rupee"></i>{product.price}</td>
                                            <td>{handlequan(product._id)}</td>
                                            <td> <i class="bi bi-currency-rupee"></i>{totalprice(product._id, product.price)}</td>
                                        </tr>

                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th rowSpan={'4'} style={{ textAlign: 'center' }}>Total Charges </th>
                                    </tr>
                                    <tr>
                                        <td colSpan={'3'} className="text-center">Product Total Amount</td>
                                        <td colSpan={'3'} className="text-center"> <i class="bi bi-currency-rupee"></i>{productTotalAmount}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={'3'} className="text-center">GST </td>
                                        <td colSpan={'3'} className="text-center"> <i class="bi bi-currency-rupee"></i>{totalGST}</td>
                                    </tr>
                                    <tr>
                                        <th colSpan={'4'} style={{ textAlign: 'center' }}>   Total Amount : {amount = productTotalAmount + totalGST}<i class="bi bi-currency-rupee"></i> </th>
                                    </tr>

                                </tfoot>
                            </table>
                        </>

                    )}
                    <button className=" btn btn-info mt-2 form-control" onClick={handlePrint}><i class="bi bi-printer-fill"></i></button>

                </div>
            </div>

        </div>

        </>
    );
}


export default Billing;