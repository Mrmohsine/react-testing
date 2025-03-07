import React , {useReducer} from 'react'

const initialState = {count: 0}
function reducer(state,action){
    switch(action.type){
        case'increment':
        return {count : state.count+1};
        case'decrement':
        return {count : state.count-1};
        case 'reset': 
        return initialState ;
        default:
            return state;
    }
}

export default function Counter() {
    const [state,dispatch] = useReducer(reducer,initialState)
    const action= (act)=>{
        dispatch({type:act})
    }
  return (
    <>
        <div className='p-4 bg-gray-200 text-center'>
            <p>Counter = {state.count}</p>

            <div className='mx-auto mt-4 flex gap-2 justify-center'>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg " onClick={()=>action('increment')}>increment</button>
                <button className='bg-blue-500 text-white px-4 py-2  rounded-lg' onClick={()=>action('decrement') }>decrement</button>
                <button className='bg-red-500 text-white px-4 py-2  rounded-lg' onClick={()=>action('reset') }>reset</button>
            </div>
        </div>
    </>
  )
}
