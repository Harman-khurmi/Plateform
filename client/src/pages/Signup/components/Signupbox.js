import React from 'react'
import { useState } from 'react';


export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    rollnumber: "",
    hostelname: "",
    password: "",
  });

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:3001/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
      console.log("response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        alert("Registration successful, Please login with same credentials");
        setUser({ name: "", rollnumber: "", hostelname: "", password: "" });
        console.log(responseData);
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        console.log("Error response: ", errorData);
      }
    } catch (error) {
      console.error("Error register fetch", error);
    }
  };



  let myStyle = {
    width: 350,
  }
  let myStyle2 = {
    marginLeft: 65,
    fontFamily: 'Inconsolata',
  }
  return (
    <>
      <div className='container mt-5 text-bg-dark p-3' style={{ width: 500, height: 600, borderRadius: 10 }}>
        <p className="bgimg mb-5" style={{ marginLeft: 170, fontSize: 35, fontFamily: 'Hubballi' }}>Signup</p>
        {/* <img src="D:\Car-parking project\car-parking\src\Components\parking.jpg" alt="" class="bg-image"/> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4" style={myStyle2}>
            <label for="exampleName" className="form-label">Name</label>
            <input
              required
              type="text"
              className="form-control"
              style={myStyle}
              value={user.name}
              onChange={handleInput}
              id="exampleName"
              name='name' />
          </div>
          <div className="mb-4" style={myStyle2}>
            <label for="exampleRollNumber" className="form-label">Roll Number</label>
            <input
              required
              type="number"
              className="form-control"
              style={myStyle}
              value={user.rollnumber}
              onChange={handleInput}
              id="exampleRollNumber"
              name='rollnumber' />
          </div>
          <div className="mb-4" style={myStyle2}>
            <label for="exampleHostelName" className="form-label">Hostel Name</label>
            <input
              required
              type="text"
              className="form-control"
              style={myStyle}
              value={user.hostelname}
              onChange={handleInput}
              id="exampleHostelName"
              name='hostelname' />
          </div>
          <div className="mb-4" style={myStyle2}>
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input
              required
              type="password"
              className="form-control"
              style={myStyle}
              value={user.password}
              onChange={handleInput}
              id="exampleInputPassword1"
              name='password' />
          </div>

          <button type="submit" className="btn btn-outline-success mt-2" style={{ marginLeft: 65, fontFamily: 'Inconsolata', borderRadius: 50, width: 350 }}>
            {/* <Link to="/" style={{textDecoration:'none', color:'white'}}>Signup</Link> */}
            Signup
          </button>
        </form>
      </div>

    </>);
}
