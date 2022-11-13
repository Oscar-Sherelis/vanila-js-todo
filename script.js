/*
1 register

POST req
name
surname
email

2 login

name 
surname

if true redirect to todo app

*/

// Local store

// Example HTTP method implementation:
async function httpReq(url = "", data = {}, httpMethod) {
  // Default options are marked with *

  let response = "";

  if (httpMethod !== "GET") {
    response = await fetch(url, {
      method: httpMethod, // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },

      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  } else if (httpMethod === "DELETE") {
    await fetch(url, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    response = await fetch(url, {
      method: httpMethod, // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  }

  if (httpMethod !== "DELETE") {
    return response.json();
  }
}
const mainUrl = "https://testapi.io/api/oscar34/resource/";

// data holders for login and register forms
let registerData = {};
let loginData = {};

function onInputDataToValue(input, key, dataHolder) {
  document.querySelector(input)?.addEventListener("input", (e) => {
    dataHolder[key] = e.target.value;
  });
}

function submitReq(btnClass, urlRoute, dataObj, httpMethod) {
  document.querySelector(btnClass)?.addEventListener("click", async (e) => {
    e.preventDefault();

    // Login page form submit with redirect if success and popup if user not exists

    if (window.location.pathname.includes("login")) {
      const loginResponse = await httpReq(mainUrl + urlRoute, dataObj, httpMethod);

      const foundUsers = loginResponse.data.filter(
        (el) => el.name === loginData.name && el.surname === loginData.surname,
      );

      if (foundUsers.length > 0) {
        localStorage.setItem("name", foundUsers[0].name);
        localStorage.setItem("surname", foundUsers[0].surname);

        window.location.pathname = "todo";
      } else {
        document.querySelector(".popup-auth-error").style.display = "block";

        document.querySelector(".close-poup")?.addEventListener("click", () => {
          document.querySelector(".popup-auth-error").style.display = "none";
        });
      }
    } else if (window.location.pathname.includes("register")) {
      localStorage.setItem("name", registerData.name);
      localStorage.setItem("surname", registerData.surname);

      await httpReq(mainUrl + urlRoute, dataObj, httpMethod);
      console.log(registerData);
      window.location.pathname = "todo";
    }
  });
}
