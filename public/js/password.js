const passwordField = document.querySelector("#inputPassword6");
const eyeIcon= document.querySelector("#eye");

eye.addEventListener("click", function(){
  this.classList.toggle("fa-eye-slash");
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
})