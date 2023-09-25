import { Link } from "react-router-dom";

function Left() {
    return ( 
        <>
        <div className="col-md-3">
        <Link to='/additem'> <button className="btn btn-info form-control mt-2 mb-2"> Category Management</button></Link>
        <Link to='/itemlist'> <button className="btn btn-info form-control mt-2"> Product Management</button></Link>
        </div>
        </>
     );
}

export default Left;