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

export default function Commande() {
  const [state, dispatch] = useReducer(reducerApi, initialState);
  const [editingCommande, setEditingCommande] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://67cb4ecd3395520e6af4fb7c.mockapi.io/commande"
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
    const client = e.target.client.value;
    const date = e.target.date.value;
    const montant = e.target.montant.value;

    if (!client.trim() || !date.trim() || !montant.trim()) {
      alert("Please enter valid data.");
      return;
    }

    try {
      const result = await axios.post(
        "https://67cb4ecd3395520e6af4fb7c.mockapi.io/commande",
        { client, date, montant }
      );
      dispatch({ type: "post", payload: result.data });

      e.target.client.value = "";
      e.target.date.value = "";
      e.target.montant.value = "";
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const update = async (e, id) => {
    e.preventDefault();
    const client = e.target.client.value;
    const date = e.target.date.value;
    const montant = e.target.montant.value;

    if (!client.trim() || !date.trim() || !montant.trim()) {
      alert("Please enter valid data.");
      return;
    }

    try {
      const result = await axios.put(
        `https://67cb4ecd3395520e6af4fb7c.mockapi.io/commande/${id}`,
        { client, date, montant }
      );
      dispatch({ type: "put", payload: result.data });
      setEditingCommande(null);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://67cb4ecd3395520e6af4fb7c.mockapi.io/commande/${id}`
      );
      dispatch({ type: "delete", payload: id });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-200">
      <h2>Commandes List</h2>

      <form
        onSubmit={
          editingCommande ? (e) => update(e, editingCommande.id) : addData
        }
        className="bg-gray-100 p-4 rounded-lg flex gap-4 items-center"
      >
        <label htmlFor="client">Client</label>
        <input
          name="client"
          type="text"
          placeholder="Enter client name"
          defaultValue={editingCommande ? editingCommande.client : ""}
        />
        <label htmlFor="date">Date</label>
        <input
          name="date"
          type="date"
          defaultValue={editingCommande ? editingCommande.date : ""}
        />
        <label htmlFor="montant">Montant (DH)</label>
        <input
          name="montant"
          type="number"
          placeholder="Enter amount"
          defaultValue={editingCommande ? editingCommande.montant : ""}
        />
        <button type="submit" className="bg-blue-200 rounded p-2">
          {editingCommande ? "Update" : "Submit"}
        </button>
      </form>
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
  <thead>
    <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
      <th className="py-3 px-6 text-left">Nom</th>
      <th className="py-3 px-6 text-left">Date</th>
      <th className="py-3 px-6 text-left">Montant (DH)</th>
      <th className="py-3 px-6 text-center">Actions</th>
    </tr>
  </thead>
  <tbody className="text-gray-600 text-sm">
    {state.result.length > 0 ? (
      state.result.map((item) => (
        <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-100">
          <td className="py-3 px-6">{item.client}</td>
          <td className="py-3 px-6">{item.date}</td>
          <td className="py-3 px-6">{item.montant} DH</td>
          <td className="py-3 px-6 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg mr-2 transition"
              onClick={() => setEditingCommande(item)}
            >
              Update
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
              onClick={() => deleteData(item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
          Loading data...
        </td>
      </tr>
    )}
  </tbody>
</table>
    </div>
  );
}
