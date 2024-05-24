// import React, { useState, useEffect } from 'react'

// export default function useApiCall(type = "get", url, query = {}, body = {},) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   console.log(type, url);
//   const executeApi = () => {
//     console.log("tets");
//     try {
//       setLoading(true);
//       if (type === "post") {
//         axios.post(url, body, query).then((response) => {
//           setData(response.data);
//           setLoading(false);
//         }).catch((error) => {
//           setError("Error getting the data");
//           setLoading(false);

//         })
//       }else if (type === "put") {
//         axios.put(url, body, query).then((response) => {
//           setData(response.data);
//           setLoading(false);
//         }).catch((error) => {
//           setError("Error getting the data");
//           setLoading(false);

//         })
//       }else if (type === "get") {
//         axios.get(url, query).then((response) => {
//           console.log("reach here");
//           setData(response.data);
//           setLoading(false);
//         }).catch((error) => {
//           setError("Error getting the data");
//           setLoading(false);

//         })
//       }else if (type === "delete") {
//         axios.delete(url, query).then((response) => {
//           setData(response.data);
//           setLoading(false);
//         }).catch((error) => {
//           setError("Error getting the data");
//           setLoading(false);

//         })
//       }
//       // const response = type === "post" ? await axios.post(url, body, query)
//       //   : type === "put" ? await axios.put(url, body, query)
//       //     : type === "delete" ? await axios.delete(url, query)
//       //       : await axios.get(url, query);


//     } catch (error) {
//       setError("Error getting the data");
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {


//   //   executeApi();
//   // }, []);

//   return { data, loading, error, executeApi };
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library
import { useNavigate } from 'react-router-dom';

export default function useApiCall(type = "get", url, query = {}, body = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const executeApi = () => {
    setLoading(true);
    const requestBody = body.current ? body.current : body; // Use body.current if body is a ref

    axios({
      method: type,
      url: url,
      params: query,
      data: requestBody
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) navigate('/login')
        setError("Error getting the data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   executeApi();
  // }, [executeApi]); // Add dependencies to useEffect

  useEffect(() => {
    console.log(data);
  }, [data]);

  return { data, loading, error, executeApi };
}