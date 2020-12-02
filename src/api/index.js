const BASE_URL = "http://fitnesstrac-kr.herokuapp.com/api";

export const getToken = () => {
  return localStorage.getItem("auth-token");
};

export const clearToken = () => {
  localStorage.removeItem("auth-token");
};

const setToken = (token) => {
  console.log(token);

  localStorage.setItem("auth-token", token);
};

function buildHeaders() {
  let base = {
    "Content-Type": "application/json",
  };

  if (getToken()) {
    base["Authorization"] = `Bearer ${getToken()}`;
  }

  return base;
}


export const auth = async (username, password, isNew = false) => {
  const url = `${BASE_URL}/users` + (isNew ? "/register" : "/login");
  const response = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  
const data = await response.json();

  if (data && data.token) {
    setToken(data.token);
  }
  return data;
};

export const hitAPI = async (method, endpoint, bodyObj) => {
  const payload = {
    method: method,
    headers: buildHeaders(),
  };

  if (bodyObj) {
    payload.body = JSON.stringify(bodyObj);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, payload);

  const  data  = await response.json();
  
  if (data.error) {
    throw Error(data.error);
  }

  if (data && data.token) {
    setToken(data.token);
  }

  return data;
};

export const RoutinesList = fetch(
  "http://fitnesstrac-kr.herokuapp.com/api/routines",
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((result) => {
    return result;
  })
  .catch(console.error);

export const getUserRoutinesList = (user) => {
  const url = BASE_URL`/user/:${user}/routines`;
  return hitAPI("GET", url);
};

export const ActivitiesList = fetch(
  "http://fitnesstrac-kr.herokuapp.com/api/activities",
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((result) => {
    return result;
  })
  .catch(console.error);

export const activitiesForm = fetch(
  "http://fitnesstrac-kr.herokuapp.com/api/activities",
  {
    method: "POST",
    body: JSON.stringify({
      name: "",
      description: "",
    }),
  }
)
  .then((response) => response.json())
  .then((result) => {
    return result;
  })
  .catch(console.error);

export const newActivitiesForm = () => {
  const url = BASE_URL`/activities`;
  return hitAPI("POST", url);
};
