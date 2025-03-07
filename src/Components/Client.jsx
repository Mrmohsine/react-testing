import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";

const initialState = { result: [] };

function reducerApi(state, action) {
  switch (action.type) {
    case "get":
      return { ...state, result: action.payload };

    case "post":
      return { ...state, result: [...state.result, action.payload] };

    case "put":
      return {
        ...state,
        result: state.result.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "delete":
      return {
        ...state,
        result: state.result.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
}

export default function Client() {
  const [state, dispatch] = useReducer(reducerApi, initialState);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://67cb4ecd3395520e6af4fb7c.mockapi.io/client"
        );
        dispatch({ type: "get", payload: result.data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addData = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const region = e.target.region.value;

    try {
      const result = await axios.post(
        "https://67cb4ecd3395520e6af4fb7c.mockapi.io/client",
        { name, region }
      );
      dispatch({ type: "post", payload: result.data });

      e.target.name.value = "";
      e.target.region.value = "";
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const update = async (e, id) => {
    e.preventDefault();
    const name = e.target.name.value;
    const region = e.target.region.value;

    try {
      const result = await axios.put(
        `https://67cb4ecd3395520e6af4fb7c.mockapi.io/client/${id}`,
        { name, region }
      );
      dispatch({ type: "put", payload: result.data });
      setEditingClient(null); 
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://67cb4ecd3395520e6af4fb7c.mockapi.io/client/${id}`
      );
      dispatch({ type: "delete", payload: id });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-200">
      <h2>API Data:</h2>

      <form
        onSubmit={editingClient ? (e) => update(e, editingClient.id) : addData}
        className="bg-gray-100 p-4 rounded-lg flex gap-4 items-center"
      >
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Enter name"
          defaultValue={editingClient ? editingClient.name : ""}
        />
        <label htmlFor="region">Region</label>
        <input
          name="region"
          type="text"
          placeholder="Enter region"
          defaultValue={editingClient ? editingClient.region : ""}
        />
        <button type="submit" className="bg-blue-200 rounded p-2">
          {editingClient ? "Update" : "Submit"}
        </button>
      </form>

      {state.result.length > 0 ? (
        <ul>
          {state.result.map((item) => (
            <li key={item.id}>
              {item.name} - {item.region} -
              <button
                className="bg-green-100 p-2 rounded"
                onClick={() => setEditingClient(item)}
              >
                Update
              </button>
              -
              <button
                className="bg-red-100 p-2 rounded"
                onClick={() => deleteData(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
