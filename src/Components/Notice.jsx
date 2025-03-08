import React, { useReducer } from "react";

const initialState = { notice: "" };

function reducer(state, action) {
  switch (action.type) {
    case "ajout":
      return { ...state, notice:  action.payload };
    case "update":
      return { ...state, notice: action.payload }; 
    default:
      return state;
  }
}

const getNoticeClass = (notice) => {
  switch (true) {
    case notice.includes("ajout"):
      return "bg-blue-200 p-2";
    case notice.includes("update"):
      return "bg-yellow-200 p-2"; 
    default:
      return "bg-green-100 p-2";
  }
};

export default function Notice() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="p-4 bg-gray-300 mx-auto w-2/3 my-4 text-center">
      <p className={getNoticeClass(state.notice)}>Notice</p>
      <p>{state.notice}</p>

      <button
        className="p-2 bg-blue-400 rounded m-2"
        onClick={() => dispatch({ type: "ajout", payload: "ajout avec succès" })}
      >
        Ajout
      </button>

      <button
        className="p-2 bg-yellow-400 rounded m-2"
        onClick={() => dispatch({ type: "update", payload: "update effectuée!" })}
      >
        Update
      </button>
    </div>
  );
}