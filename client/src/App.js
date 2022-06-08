
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import "./App.css";

function App() {

  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [newFoodName, setNewFoodName] = useState("");
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:5000/read').then((response) => {
      setFoodList(response.data);
    })
  }, [])

  const addToList = () => {
    Axios.post("http://localhost:5000/insert", {
      foodName: foodName, 
      days: days});
  };

  const updateFood = (id) => {
    Axios.put("http://localhost:5000/update", {
      id: id, 
      newFoodName:newFoodName,
    });
  };


  return (
    <div className="App">
      <h1>CRUD with MERN</h1>
     
        <input placeholder="name" 
            type="text" 
            onChange={(event) => {
              setFoodName(event.target.value);
            }}/> 


        <input placeholder="day since you eat" type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
        />

        <button className="submit_button" onClick={addToList}>Add to list</button>

        <hr/>

      <h1>Food List</h1>

      <table>
        <thead>
        <tr>
            <th>Food</th>
            <th>Days since eat</th>
            <th>Function</th>
        </tr>
        </thead>
        <tbody>
            {foodList.map((val, key) => {
              return (
                  <tr key={key}>
                    <td>{val.foodName}</td>
                    <td className="days_ate">{val.daysAte}</td>
                    <td><input 
                            type="text" 
                            placeholder="Edit Food" 
                            onChange={(event) => {
                              setNewFoodName(event.target.value); 
                            }}
                          />    
                    <button onClick={() => updateFood(val._id)} className="update_button">Update</button><button className="delete_button">Delete</button></td>
                    
                  </tr>
                );
            })}    
        </tbody>
      </table>
      
  
    
    </div>
  );
}

export default App;
