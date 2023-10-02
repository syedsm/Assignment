import {  useState } from "react";
import Left from "./left";


function Productadd() {
    const [selectedCategory, setSelectedCategory] = useState("grocerie");

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('')
    const [price, setPrice] = useState('')
    const [qty, setQty] = useState('')
    
    const [message,setmessage]=useState('')
   

    // function handleimage(e){
    // console.log( e.target.files)
    //    setImg( e.target.files[0])
    // }

    function handleForm(e) {
        e.preventDefault();
        console.log("selectedCategory :", selectedCategory);
        console.log("Name  :", name);
        console.log("Desc  :", desc);
        console.log("price :", price);
        console.log("qty   :", qty);
        console.log("Img   :", img)

        let data = new FormData()
        data.append("selectedCat", selectedCategory);
        data.append('name', name)
        data.append('desc', desc)
        data.append('price', price)
        data.append('qty', qty)
        data.append('img', img)

        fetch('/api/itemadd', {
                method: "POST",
                body: data
            }).then((res) => { return res.json() }).then((data) => {
                // console.log(data)  
                if(data.status===201){
                    setmessage(data.message)
                }
                else{
                    setmessage(data.message)
                }
            })
    
    }

    
    const renderFormFields = (e) => {
        switch (selectedCategory) {
            case "grocerie":
                return (
                    <div>
                        <label>grocerie Name:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>grocerie itemDescription:</label>
                        <textarea
                            className="form-control"
                             type="String"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                        <label>grocerie Image:</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                        <label>grocerie price:</label>
                        <input
                            className="form-control"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label>grocerie qty:</label>
                        <input
                            className="form-control"
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                        />
                    </div>
                );
            case "toys":
                return (
                    <div>
                        <label>Toy Name:</label>
                        <input
                        className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Toy itemDescription:</label>
                        <textarea
                        className="form-control"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                        <label>Toy Image:</label>
                        <input
                        className="form-control"
                            type="file"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                        <label>Toy price:</label>
                        <input
                        className="form-control"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <label>Toy qty:</label>
                        <input
                        className="form-control"
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                        />

                    </div>
                );
            case "cosmetics":
                return (
                    <div>
                        <label>cosmetic Name:</label>
                        <input
                        className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>cosmetic itemDescription:</label>
                        <textarea
                        className="form-control"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                        <label>cosmetic Image:</label>
                        <input
                        className="form-control"
                            type="file"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                        <label>cosmetic price:</label>
                        <input
                        className="form-control"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label>cosmetic qty:</label>
                        <input
                        className="form-control"
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                        />

                    </div>
                );
            case "decor":
                return (
                    <div>
                        <label>decor Name:</label>
                        <input
                        className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>decor itemDescription:</label>
                        <textarea
                        className="form-control"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                        <label>decor Image:</label>
                        <input
                        className="form-control"
                            type="file"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                        <label>decor price:</label>
                        <input
                        className="form-control"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label>decor qty:</label>
                        <input
                        className="form-control"
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                        />

                    </div>
                );
            case "electricaplliance":
                return (
                    <div>
                        <label>Electric Aplliance Name:</label>
                        <input
                        className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        
                        <label>Electric Aplliance itemDescription:</label>
                        <textarea
                        className="form-control"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>

                        <label>Electric Aplliance Image:</label>
                        <input
                        className="form-control"
                            type="file"
                            onChange={(e) => setImg(e.target.files[0])}
                        />

                        <label>Electric Aplliance price:</label>
                        <input
                        className="form-control"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <label>Electric Aplliance Quantity:</label>
                        <input 
                        className="form-control"
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                        />

                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="container" >
                <div className="row">
                    <Left />
                    <div className="col-md-9">
                        <h3 className="text-center">{message}</h3>    
                        <form onSubmit={(e)=>{handleForm(e)}}>
                            <label>Select Category:</label>
                            <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="grocerie">Groceries</option>
                                <option value="toys">Toys</option>
                                <option value="cosmetics">Cosmetics</option>
                                <option value="electricaplliance">Electric Aplliance</option>
                                <option value="decor">Decor</option>
                            </select>

                            {renderFormFields()}

                            <button type="submit" className="form-control mt-2 btn btn-success">Add Product</button>
                        </form>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Productadd;