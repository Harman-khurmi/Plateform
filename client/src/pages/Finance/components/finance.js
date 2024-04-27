import React from 'react';
import './finance.css';

function App() {
  var accbal=22000;
  var totalMeals=10;
  var breakfast=3;
  var lunch=4;
  var dinner=3;
  var total=25000;
  return (
    <div className="container shadow">
      
      <div className="vertical-box">
        <div className="box shadow"></div>
        <div className="box shadow"></div>
        <div className="box shadow"></div>
      </div>
      <div className="blue-box">
        <h2>Account Balance</h2>
        <p style={{fontSize:50}}>Rs {accbal}</p>
        <p style={{fontSize:20, marginTop:30}}>Total meals taken: <span className="space"> </span>{totalMeals}</p>
        <div className="line"></div>
        <p style={{fontSize:20, marginTop:30}}>Breakfast Count: <span className="space"> </span>{breakfast}</p>
        <p style={{fontSize:20}}>Lunch Count: <span className="space2"> </span>{lunch}</p>
        <p style={{fontSize:20}}>Dinner Count: <span className="space3"> </span>{dinner}</p>
        <div className="d-flex justify-content-center mt-5">
          <span className="total">Total Paid: Rs {total}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
