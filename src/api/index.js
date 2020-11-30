const BASE_URL = "http://fitnesstrac-kr.herokuapp.com/api"

export const getToken = () => {
    return localStorage.getItem("auth-token");
  };
  
  export const clearToken = () => {
    localStorage.removeItem("auth-token");
  };
  
  const setToken = (token) => {
console.log(token)

    localStorage.setItem("auth-token", token);
  };
  
  function buildHeaders() {
    let base = {
      "Content-Type": "application/json",
    };
  console.log(getToken())
    if (getToken()) {
      base["Authorization"] = `Bearer ${getToken()}`;
    }
  
    return base;
  }


  export const auth = async (username, password, isNew = false) => {
    console.log(username, password)
    const url = `${BASE_URL}/users` + (isNew ? "/register" : "/login");
    const response = await fetch(url, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({ 
          username: username,
          password: password
      }),
    });
  
    const { error, data } = await response.json();
 
    if (error) {
        console.log(error)
      throw Error(error.message);
    }
  
    if (data && data.token) {
      setToken(data.token);
      console.log("worked", data.token)
    }
  console.log(data, error, 'working')
    return data;
  };
  
  export const hitAPI = async (method, endpoint, bodyObj) => {
    const payload = {
      method: method,
      headers: buildHeaders(),
    };
  console.log(payload.headers, "hearder")
    if (bodyObj) {
      payload.body = JSON.stringify(bodyObj);
    }
  
    const response = await fetch(`${BASE_URL}${endpoint}`, payload);
  
    const { error, data } = await response.json();
  
    if (error) {
      throw Error(error.message);
    }
  
    if (data && data.token) {
      setToken(data.token);
    }
  
    return data;
  };

