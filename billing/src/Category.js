import { Form, Link, useNavigate, useParams } from "react-router-dom";
import Left from "./left";
import { useEffect, useState } from "react";
import Header from "./Header";

function Adminproduct() {
   
    let Navigate = useNavigate()

    const [products, setProducts] = useState([''])
    const [message, setmessage] = useState([''])

    useEffect(() => {
        fetch('/api/allproduct')
            .then((result) => { return result.json() }).then((data) => {
                // console.log(data)
                if (data.status === 200) {
                    setProducts(data.apiData)
                } else {
                    setmessage(data.message)
                }
            })
    }, [])
    // const {id}=useParams()
    function handledelete(e, id) {
        //  console.log(id)
        // const id=useParams
        fetch(`/api/delete/${id}`, {
            method: 'DELETE'
        }).then((result) => { return result.json() }).then((data) => {
            console.log(data)
            if (data.status === 200) {
                Navigate('/categorymanagement')
            } else {
                setmessage(data.message)
            }
        })
    }



    return (
        <>

    <Link to='/Grocerie'><button >SUBMIT</button></Link>
            <section id="mid">
                <div className="container">
                    <div className="row">
                        <Left />
                        <div className="col-md-9">
                            <h2 className="text-center">Category List Management</h2>
                            <p>{message}</p>
                            <Link to='/adminproductadd'>  <button className="btn btn-success form-control ">Add Product Category</button></Link>
                            <table className="table table-hover margin-left:30px " >
                                <thead>
                                    <tr>
                                        <th >S.No</th>
                                        <th >Category Name</th>
                                        <th>Category Description</th>
                                        <th>Category Status</th>
                                        <th>Category Image</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((result, key) => (
                                        <tr>
                                            <td>{key + 1}</td>
                                            <td>{result.name}</td>
                                            <td>{result.desc}</td>
                                            <td>{result.status}</td>
                                            <td><img style={{ width: "65px" }} src={`/productimages/${result.img}`} alt="error"></img></td>
                                            <td><button className="btn btn-warning"><Link style={{ textDecoration: "none", color: "white" }} to={`/categoryupdate/${result._id}`} >Update</Link></button></td>
                                            <td><button className="btn btn-danger"><Link style={{ textDecoration: "none", color: "white" }} to={`/categorydelete/${result._id}`}><i class="bi bi-trash"></i></Link></button> </td>
                                    {/* <td><button className="btn btn-success" onClick={(e)=>{handledelete(e,result._id)}}>bu</button></td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}

export default Adminproduct;