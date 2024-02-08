import { Link } from "react-router-dom";
import React from "react";

export default function Forgot() {
  let myStyle = {
    width: 350,
  };
  let myStyle2 = {
    marginLeft: 65,
    fontFamily: "Inconsolata",
  };

  return (
    <>
      <div className="container mt-5 text-bg-dark p-3" style={{ width: 500, height: 420, borderRadius: 10 }}>
        <p
          className="bgimg my-4"
          style={{ marginLeft: 130, fontSize: 30 }}
        >
          Reset Password
        </p>
        {/* <img src="D:\Car-parking project\car-parking\src\Components\parking.jpg" alt="" class="bg-image"/> */}
        <form>
          <div className="mb-3" style={myStyle2}>
            <label for="exampleInputEmail1" className="form-label">
              Email-ID
            </label>
            <input
              type="email"
              className="form-control"
              style={myStyle}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text" style={{ color: "grey" }}>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3" style={myStyle2}>
            <label for="exampleUserName" className="form-label">
              OTP
            </label>
            <input
              type="number"
              className="form-control"
              style={myStyle}
              id="exampleotp"
            />
          </div>

          <button
            type="submit"
            className="btn btn-outline-success mt-4"
            style={{ marginLeft: 65, borderRadius: 50, width: 350 }}
          >
            <Link to="Signup" style={{ textDecoration: 'none', color: 'white' }}>Reset</Link>
          </button>
        </form>
      </div>
    </>
  );
}
