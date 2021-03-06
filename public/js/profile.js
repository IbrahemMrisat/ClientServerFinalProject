var userData=null
function authenticate() {
  fetch("/users/authenticate")
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      if (!res.authenticated) {
        window.location.href = "/index.html";
      }else{
        userData=res.user;
        username=document.getElementById('username');
        console.log(username);
        username.innerHTML=res.user.fname+" "+res.user.lname;
        fname.value=res.user.fname;
        lname.value=res.user.lname;
        email.value=res.user.email
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
authenticate();


function fetchPurchases() {
  fetch("/records/get_data")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      var purchases = document.getElementById("purchases");
      res.data.map((value, index) => {
        purchases.insertAdjacentHTML(
          "beforeend",
          `<li class="single-purchase">
      <div class="item">
          <div class="pic">
              <img src="images/${value.product}.png" alt="...">
          </div>
          <div class="item-d">
              <h3>${value.product}</h3>
              <p>${value.quantity} Units</p>
          </div>
      </div>
  </li>`
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
fetchPurchases();


function updatePass(e) {
  var msgDiv = msg2;
  msgDiv.innerHTML = "";
  const values = {
    old_pass:e.target.old_pass.value,
    password: e.target.password.value,
    rep_pass: e.target.rep_pass.value,
  };
  if (values.password !== values.rep_pass) {
    msgDiv.insertAdjacentHTML("beforeend", "<p>New Password Does not match</p>");
  }else if (!(/[0-9]/.test(values.password) && /[a-z]/.test(values.password) && /[A-Z]/.test(values.password) && values.password.length > 7)) {
    msgDiv.insertAdjacentHTML("beforeend", "<p>Passwords must contain at least 8 characters, including uppercase, lowercase letters and numbers.</p>");
  }
  else {
    msgDiv.insertAdjacentHTML("beforeend", "<p>Please wait...</p>");
    const options = {
      body: JSON.stringify(values),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(options);
    // const url=`${window.location.protocol}://${window.location.host}/users/signup`
    const url=`/users/update_password`
    console.log(window.location.host);
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        msg.innerHTML = "";
        if (res.success) {
          msgDiv.insertAdjacentHTML("beforeend", "<p>Password updated successfully now you can <a href='/' style='color:blue; cursor:pointer;'>Login</a></p>");
        }else{
          msgDiv.insertAdjacentHTML("beforeend", `<p>${res.message}</p>`);
          
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        // msgDiv.insertAdjacentHTML("beforeend", "<p>Server Error</p>");
      });
  }
  console.log(values);
  e.preventDefault();
}
function updateInfo(e) {
  var msgDiv = msg1;
  msgDiv.innerHTML = "";
  const values = {
    fname:e.target.fname.value,
    lname: e.target.lname.value,
    email: e.target.email.value,
  };
  
    msgDiv.insertAdjacentHTML("beforeend", "<p>Please wait...</p>");
    const options = {
      body: JSON.stringify(values),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(options);
    // const url=`${window.location.protocol}://${window.location.host}/users/signup`
    const url=`/users/update_info`
    console.log(window.location.host);
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        msgDiv.innerHTML = "";
        if (res.success) {
          msgDiv.insertAdjacentHTML("beforeend", "<p>Data updated successfully</p>");
        }else{
          msgDiv.insertAdjacentHTML("beforeend", `<p>${res.message}</p>`);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        // msgDiv.insertAdjacentHTML("beforeend", "<p>Server Error</p>");
      });
  console.log(values);
  e.preventDefault();
}


// dropdown
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// window.onclick = function (event) {
//   if (!event.target.matches(".dropbtn")) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };
