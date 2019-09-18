$(document).ready(function() {
  //If payment status is pending, change the color to red

  var $employees = $("#employee-data");
  var $counter = 1;
  // alert($("employees[1].first_name"));
  // console.log($("employees[1].first_name"));

  // toggle the payroll actions
  $("#toggle-more-about-div").on("click", function() {
    $("#more-about-div").toggle();
  });

  //Logout Button action
  $("#log-out-button").on("click", function goToURL() {
    location.href = "login.html";
  });

  //GET all the data from the db and output them all in the table

  $.ajax({
    type: "GET",
    url: "http://localhost:3000/employees",
    success: function(employees) {
      $.each(employees, function(i, employee) {
        $employees.append(
          `<tr><th scope="row">${$counter++}</th>  
          <td>${employee.first_name}</td>  <td>${employee.last_name}</td> 
          <td>${employee.role}</td> <td>${employee.salary}</td> <td>${
            employee.payment_status
          }</td> 
          <td>
          <a data-id="${
            employee.id
          }"  class="btn btn-danger update-button" data-toggle="modal" data-target="#update-button" >
          <i class="fas fa-edit"></i>
          </a>
        
          </td>  
          <td>
          <a data-id="${employee.id}" class="btn btn-danger remove-button">
          <i class="far fa-trash-alt"></i>
          </a>
          </td>   
          </tr> `
        );
      });
    }
  });

  //Find Employee actions
  $("#find-employee-status").hide();

  $("#show-employee-status").on("click", function() {
    $("#find-employee-status").show();
  });
});

$("#save-employees").on("click", function(e) {
  e.preventDefault();
  function salary(role) {
    if (role === "Manager") {
      let managerSalary = 500000;
      return managerSalary;
    } else if (role === "Senior Developer") {
      let seniorDevSalary = 400000;
      return seniorDevSalary;
    } else if (role === "Intern") {
      let internSalary = 100000;
      return internSalary;
    } else if (role === "Junior Developer") {
      let juniorDevSalary = 300000;
      return juniorDevSalary;
    } else if (role === "Casual Staff") {
      let casualStaffSalary = 200000;
      return casualStaffSalary;
    }
  }

  var expectedSalary = salary($("#select-role option:selected").text());

  var employeeData = {
    first_name: $("#create-employee-FN").val(),
    last_name: $("#create-employee-LN").val(),
    role: $("#select-role option:selected").text(),
    payment_status: $("#payment-status option:selected").text(),
    salary: expectedSalary
  };

  //CREATE AND POST FROM THE CREATE
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/employees",
    data: employeeData,
    success: function(newEmployee) {
      $employees.append(
        `<tr><th scope="row">${$counter++}</th>  
          <td>${newEmployee.first_name}</td>  <td>${newEmployee.last_name}</td> 
          <td>${newEmployee.role}</td> <td>${employeeData.salary}</td> <td>${
          newEmployee.payment_status
        }</td> 
          <td>
          <a data-id="${
            employee.id
          }"  class="btn btn-danger update-button" data-toggle="modal" data-target="#update-button" 
          <i class="fas fa-edit"></i>
          </a>
          </td>  
          <td>
          
          <a data-id="${employee.id}" class="btn btn-danger remove-button">
          <i class="far fa-trash-alt"></i>
          </a>
          </td>   
          </tr> `
      );
    },
    error: function() {
      alert("error saving order");
    }
  });
});

// DELETE FUNCTION
$("#employee-data").on("click", ".remove-button", function(e) {
  e.preventDefault();
  $.ajax({
    type: "DELETE",
    url: "http://localhost:3000/employees/" + $(this).attr("data-id")
    // success: function() {
    //   $tr.remove();
    // }
  });
});

// ' + '"' + 1 +'"' + '
// UPDATE FUNCTION

$("#employee-data").on("click", ".update-button", function(e) {
  $("#more-about-div").toggle();
  $("#update-users-card").append(` <div  class="modal-content ">
  <div class="modal-header update-employee-card ">
    <h5 class="modal-title" id="exampleModalCenterTitle">Update Employee Details</h5>
  </div>
  <div class="modal-body">
   <form>
        <div class="form-group">
          <label for="update-employee-FN">First name of Employee</label>
          <input type="text" class="form-control" id="update-employee-FN" placeholder="John">
        </div>

        <div class="form-group">
                <label for="update-employee-LN">Last name of Employee</label>
                <input type="text" class="form-control" id="update-employee-LN" placeholder="Doe">
        </div>

        <div class="form-group">
          <label for="update-role">Select Role</label>
          <select class="form-control" id="update-role">
            <option>Manager</option>
            <option>Senior Developer</option>
            <option>Junior Developer</option>
            <option>Casual Staff</option>
            <option>Intern</option>
          </select>
        </div>

        <div class="form-group">
          <label for="update-payment-status">Select Payment Status</label>
          <select class="form-control" id="update-payment-status">
            <option>Paid</option>
            <option>Pending</option>
          </select>
        </div>  
      </form>
  </div>
  <div class="update-footer">
    <button type="button" id="cancel-update" class="btn btn-danger btn-block" data-dismiss="modal">cancel</button>
    <button class="btn btn-primary btn-block" id="update-employees">Save changes</button>
  </div>
</div>`);
  alert($("e.target").attr("data-id"));
});

$("#update-users-card").on("click", "#cancel-update", function(e) {
  $("#update-users-card").remove();
  $("#more-about-div").toggle();
});

$("#update-users-card").on("click", "#update-employees", function(e) {
  // alert($("remove-button").attr("id"));
  // alert($("#update-employee-FN").val());
  // alert($("#update-employee-LN").val());
  // alert($("#update-role option:selected").val());
  // alert($("#update-payment-status option:selected").val());

  var updateEmployeeData = {
    first_name: $("#update-employee-FN").val(),
    last_name: $("#update-employee-LN").val(),
    role: $("#update-role option:selected").text(),
    payment_status: $("#update-payment-status option:selected").text(),
    salary: expectedSalary
  };

  $.ajax({
    type: "PUT",
    url: "http://localhost:3000/employees/" + $(this).attr("id"),
    data: updateEmployeeData,
    success: function() {}
  });

  // $("#update-users-card").remove();
  // $("#more-about-div").toggle();
});
