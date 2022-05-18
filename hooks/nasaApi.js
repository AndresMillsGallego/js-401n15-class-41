import { useState, useEffect } from 'react'
import axios from 'axios'

function useNasaAPI() {

  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);

  const get = async (url) => {
    try {
      let response = await axios.get(url);
      setResponse(response);
    } catch (error) {
      setError(error)
      console.log(error.message);
    }
  }

  return {
    ...response,
    error,
    get
  }
}

export default useNasaAPI;