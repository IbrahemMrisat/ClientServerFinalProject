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


// dropdown
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
