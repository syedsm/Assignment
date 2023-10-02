import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Contextapi } from './Contextapi';
import { useContext, useEffect, useState } from 'react';

import Login from './Login';
import Reg from './reg';
import Dashboard from './Dashboard';
import Category from './Category';
import Product from './Product';

import Header from './Header';
import Footer from './Footer';
import Categorydelete from './Categorydelete';
import Cart from './Cart';
import Printpage from './printpage';
import Userpage from './Userpage';
import Productadd from './Productadd';
import Itemlist from './Itemlist';
import Billing from './Billing';
import Stockmanage from './Stockmanage';


function App() {
    const [loginname, setLoginname] = useState(localStorage.getItem('loginname'))
    const [cart, setCart] = useState('')
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return (
        <>
            <Router>

                <Contextapi.Provider value={{ loginname, setLoginname, cart, setCart }}>
                    <Header />
                    <Routes>

                        {loginname ?
                            <>
                                <Route path='/dashboard' element={<Dashboard />}></Route>
                                <Route path='/categorymanagement' element={<Category />}></Route>
                                <Route path='/productmanagment' element={<Product />}> </Route>
                                <Route path='/adminproductadd' element={<Productadd />}> </Route>
                                <Route path='/categorydelete/:id' element={<Categorydelete />}> </Route>
                                <Route path='/cart' element={<Cart />}></Route>
                                <Route path='/printpage' element={<Printpage />}></Route>
                                <Route path='/userpage' element={<Userpage />}></Route>
                                <Route path='/additem' element={<Productadd />}></Route>
                                <Route path='/itemlist' element={<Itemlist />}></Route>
                                <Route path='/billprint' element={<Billing hideHeaderFooter={true} />}></Route>
                                <Route path='/stockmanagement' element={<Stockmanage />}></Route>

                            </>

                            :
                            <>

                                <Route path='/' element={<Login />}></Route>
                                <Route path='/reg' element={<Reg />}></Route>
                            </>
                        }
                    </Routes>
                    <Footer />
                </Contextapi.Provider>

            </Router>
        </>
    );
}

export default App;