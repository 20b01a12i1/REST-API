import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
function Postform() {

  const [dataget, setDataget] = useState([]);
  const [data, setData] = useState({
    date: "",
    title: "",
    body: "",
  });
  
  const url = `http://localhost:3001/insert`;
  const getDataApi = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => {
        setDataget(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getDataApi();
  }, []);

  function handleChange(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  function submit(e) {
    e.preventDefault();
    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        // date: data.date,
        // title: data.title,
        // body: data.body,
        userId:data.userId,
        title:data.title,
        body:data.body
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  
  const deletedata = (id, e) => {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => 
            axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then((res) => {
                  console.log("Deleted");
                  console.log(res);
                })
                .catch((err) => console.log(err))
          },
          {
            label: 'No',
            onClick: () => console.log("Deletion is cancelled!!")
          }
        ]
      });
    // if (window.confirm("Do you really want to Delete?")) {
    //   axios
    //     .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    //     .then((res) => {
    //       console.log("Deleted");
    //       console.log(res);
    //     })
    //     .catch((err) => console.log(err));
    // }
    
    // else{
    //   console.log("Deletion is cancelled!!")
    // }
  };

  const updatedata = () => {
    const x = {
      userId: "2345",
      id: "12345",
      title: "asdf",
      body: "svecw",
    };
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/1`, x)
      .then((x) => {
        console.log(x);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form className="ui form" onSubmit={(e) => submit(e)}>
        <div className="field">
          <label>userid</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="userId"
            value={data.userId}
            id="userId"
            required
          />
        </div>
        <div className="field">
          <label>title</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="title"
            id="title"
            value={data.title}
            required
          />
        </div>
        <div>
          <label>body</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="body"
            id="body"
            value={data.body}
            required
          />
        </div>
        <button className="ui red button" type="submit">
          Submit
        </button>
      </form>

      <div>
        {dataget.map((item) => (
          <div key={item.id}>
            {item.title} &nbsp; &nbsp;{" "}
            <button onClick={(e) => deletedata(item.id)}>delete</button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={updatedata}>update</button>
      </div>
      
    </div>
  );
}

export default Postform;
