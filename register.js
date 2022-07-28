$(document).ready(function () {
  /** Function for register a new user in to database  **/
  $("#btn-save-user").on("click", function () {
    let first_name = $("#f_name").val();
    let last_name = $("#l_name").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let confirm_password = $("#c_password").val();

    let error = false;
    if (!first_name || first_name.trim() == "") {
      $("#error_f_name").text("Invalid First Name");
      error = true;
    } else {
      $("#error_f_name").text("");
      error = false;
    }

    if (!last_name || last_name.trim() == "") {
      $("#error_l_name").text("Invalid Last Name");
      error = true;
    } else {
      $("#error_l_name").text("");
      error = false;
    }

    if (!email || email.trim() == "") {
      $("#error_email").text("Invalid Email");
      error = true;
    } else {
      $("#error_email").text("");
      error = false;
    }

    if (!password || password.trim() == "") {
      $("#error_password").text("Invalid Password");
      error = true;
    } else {
      if (password.length < 4) {
        $("#error_password").text("Password must be atleast more than 4 char");
        error = true;
      } else {
        $("#error_password").text("");
        error = false;
      }
    }

    if (password && confirm_password && password == confirm_password) {
      error = false;
      $("#error_c_password").text("");
    } else {
      $("#error_c_password").text("Password is not maching");
      error = true;
    }

    if (!error) {
      /** Check if user is already register with this email address  */

      let isAlreadyRegister = window.isUserAlreadyRegister(email);
      if (isAlreadyRegister) {
        $("#error_email").text(
          "User with this email address is already registered"
        );
        return false;
      }
      let user = {
        id: +new Date(),
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      };
      let response = window.registerUser(user);
      if (response) {
        alert("User registered successfully");
        window.location.assign("/login.html");
      } else {
        alert("Unable to register user");
      }
    }
  });

  $("#btn-login-user").on("click", function () {
    let email = $("#email").val();
    let password = $("#password").val();
    let error = true;
    if (!email || email.trim() == "") {
      $("#error_email").text("Invalid Email");
      error = true;
    } else {
      $("#error_email").text("");
      error = false;
    }

    if (!password || password.trim() == "") {
      $("#error_password").text("Invalid Password");
      error = true;
    } else {
      error = false;
      $("#error_password").text("");
    }

    if (!error) {
      let response = window.login(email, password);
      if (response) {
        window.location.assign("/secure/dashboard.html");
      } else {
        alert("User is not registered");
      }
    }
  });
});
