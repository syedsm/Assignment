import { useContext } from "react";
import { Contextapi } from "./Contextapi";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { loginname, setLoginname ,cart} = useContext(Contextapi)
  
  let navigate = useNavigate()
  function handlelogout(e) {
    setLoginname(localStorage.removeItem('loginname'))
    navigate('/')
  }
  return (
    <>
      {
        loginname ?
          <section id="header" className="text-white">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-2">
                  <img
                    src="./trolley.png"
                    alt="..."
                    style={{ width: "50px" }}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-10">
                  <ul className="nav justify-content-end">
                    <li className="nav-item me-2">
                      <button className="btn btn-info ">Welcome {loginname}</button>
                    </li>
                    <li className="nav-item me-2">
                      <Link to={'/stockmanagement'}><button className="btn btn-info">Dashboard</button></Link>
                    </li>
                    <li className="nav-item me-2">
                      <button className="btn btn-info">Profile</button>
                    </li>
                    
                     <Link to='/cart'><button className="btn btn-info me-2 "><i class="bi bi-cart-plus"> {!cart.totalItems ? 0 : cart.totalItems}</i></button></Link>

                    <li className="nav-item me-2">
                      <button className="btn btn-info  " onClick={(e) => { handlelogout(e) }}>
                        <i className="bi bi-box-arrow-right"></i> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          :
          <></>
      }
    </>
  );
}

export default Header;