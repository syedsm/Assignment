import { useState } from "react";
import { Link } from "react-router-dom";

function Reg() {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    let [message, setmessage] = useState('')
    function handleform(e) {
        e.preventDefault()
        const data = { Username, Password }
        fetch('/api/reg', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((result) => { return result.json() }).then((data) => {
            // console.log(data)
            if (data.apiData === 201) {
                setmessage(data.message)
            } else {
                setmessage(data.message)
            }
        })
    }
    return (
        <section id="login">
            <div className="container">
                <div className="row ">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                        <h2>Register Here!</h2>
                        <h6>{message}</h6>
                        <form onSubmit={(e) => { handleform(e) }}>
                            <label>Enter Username</label>
                            <input type="text" className="form-control"
                                value={Username}
                                onChange={(e) => { setUsername(e.target.value) }} />
                            <label>Enter Password</label>
                            <input type="text" className="form-control"
                                value={Password}
                                onChange={(e) => { setPassword(e.target.value) }} />

                            <button type="submit" className="form-control mt-3 btn btn-info">Create Account</button>

                        </form>
                        <Link to='/'><button className="form-control btn btn-success mt-3">Back to Login</button></Link>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
            </div>
        </section>
        );
}

export default Reg;