import React, { useReducer } from "react";

const initialState = { name: "mohsine", email: "mohsine@gmail.com" };

export function reducerP(state, action) {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    case "reset":
        return initialState;
    default:
      return state;
  }
}

export default function Person() {
  const [state, dispatch] = useReducer(reducerP, initialState);
  const dispatchValue = (action, e) => {
    dispatch({ type: action, payload: e.target.value });
  };

  return (
    <>
      <div className="p-4 bg-gray-200 text-center">
        <p>{state.name}</p>
        <p>{state.email}</p>
        <form>
          <label htmlFor="name">Nom: </label>
          <input
            id="name"
            type="text"
            value={state.name}
            onChange={(e) => dispatchValue("setName",e)}
            className="border p-1 m-2"
          />

          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            value={state.email}
            onChange={(e) => dispatchValue("setEmail",e)}
            className="border p-1 m-2"
          />
          <button
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "reset" });
          }}
          className="bg-red-400 rounded-xl p-3"
        >
          Reset
        </button>
        </form>
      </div>
    </>
  );
}