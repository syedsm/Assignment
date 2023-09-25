import { useContext, useState } from "react";
import { Contextapi } from "./Contextapi";

function Footer() {
    const { loginname, setLoginname } = useContext(Contextapi)

    return (        
        <>
            {
                loginname ?
                    <section id="footer">
                        <div className="container">
                            <div className="row">
                                <div col-md-4>
                                    <h2>Footer</h2>
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

            export default Footer;