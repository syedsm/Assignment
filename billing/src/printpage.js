function Printpage() {

    return ( <>
    <div id="container">
        <h1>Vehicle Parking Discharge Bill</h1>
        
        <div className="bill-details">
          <p><span>Bill Number:</span> {}</p>
          <p><span>Date:</span>    {}</p>
        </div>
        
        <div className="vehicle-details">
          <table>
            <tr>
              <th> Registration:</th>
              <td>{}</td>
            </tr>
            <tr>
                <th>Vehicle Type:</th>
                <td>{}</td>
              </tr>
            <tr>
              <th>Entry Time:</th>
              <td>{}</td>
            </tr>
            <tr>
              <th>Exit Time:</th>
              <td>{}</td>
            </tr>
            <tr>
              <th>Parking Duration:</th>
              <td>{}</td>
            </tr>
          </table>
        </div>
        
        <div className="total-amount">
          <p><span>Total Amount:</span> INR {}.00</p>
        </div>
      </div>
    </> );
}

export default Printpage;