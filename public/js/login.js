$(document).ready(function() {
  $("#login-signup-button").on("click", function goToURL() {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/admin",
      success: function(admins) {
        $.each(admins, function(i, admin) {
          if (
            $("#inputEmail").val() === admin.email &&
            $("#inputPassword").val() === admin.password
          ) {
            location.href = "dashboard.html";
          } else {
            alert("Wrong Login Information");
          }
        });
      }
    });
  });
});
