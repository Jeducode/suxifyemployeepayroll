$(document).ready(function() {
  $("input#inputEmail").change(function(e) {
    alert(e.target.value);
  });
  $("input#inputPassword").change(function(e) {
    alert(e.target.value);
  });
  $("#login-signup-button").on("click", function goToURL() {
    location.href = "index.html";
  });
});
