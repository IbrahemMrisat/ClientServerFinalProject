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
        console.log(username);``
        username.innerHTML=res.user.fname+" "+res.user.lname;
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


function handleSubmit(e) {
  console.log(e.target);
  values = {
    product: selectedProduct.name,
    model: selectedModel,
    quantity: e.target.quantity.value,
    card_number: e.target.card_number.value,
    name: e.target.name.value,
    expiry: `${e.target.expiry_year.value}/${e.target.expiry_month.value}`,
    cvv: e.target.cvv.value,
  };
  const options = {
    body: JSON.stringify(values),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = `/records/add_transaction`;
  console.log(window.location.host);
  fetch(url, options)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.success) {
        window.location.href = `/thanks-for-purchase`;
      } else {
        msg.innerHTML = res.message;
      }
      // // window.location.href = `/`;
    })
    .catch((err) => {
      console.log(err);

      // msgDiv.insertAdjacentHTML("beforeend", "<p>Server Error</p>");
    });
  console.log(values);
  e.preventDefault();
}

// dropdown
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function handleDD() {
  document.getElementById("dd").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
// window.onclick = function (event) {
//   this.console.log(event.target);
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
