import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Stockmanage() {
    const [Stock, setStock] = useState([])
    const [message, setmessage] = useState()

    useEffect(() => {

        fetch('api/stockfetch', {
            method: 'GET'
        }).then((res) => { return res.json() }).then((data) => {
            // console.log(data)
            if (data.status === 200) {
                setStock(data.apiData)
            } else {
                setmessage(data.message)
            }
        })
    }, [])
    return (<>
        
        <div className="container mt-3" >
            <div className="row justify-content-center" >
                <h3 className="text-center">Stock Management</h3>
                <div className="col-md-12 d-flex me-5">
                    {message}
                    {Stock.map((item) => (
                        <div className="card " style={{width: "18rem;"}}>
                            <img src={`../productimages/${item.img}`}  style={{ width: "100px" }} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.desc}</p>
                                <p className="card-text">{item.qty}</p>
                                <Link to="#" class="btn btn-primary">Go somewhere</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>);
}

export default Stockmanage;