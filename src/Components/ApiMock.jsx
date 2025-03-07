import axios from 'axios';
import React, { useEffect } from 'react'


export default function ApiMock() {
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const result = await axios.get("https://67cb4ecd3395520e6af4fb7c.mockapi.io/client");
              console.log(result.data);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          fetchData();
        
      },[]);
      const initialState = {result} ;
      function reducerApi (state,action) {
        switch(action.type){
            case 'get':
                return
        }
      }

  return (
    <>
    <div>
        api
    </div>
    </>
  )
}

