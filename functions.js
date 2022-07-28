window.getLocalUsers = function () {
  return localStorage.getItem("users") ? localStorage.getItem("users") : [];
};

window.login = function (email, password) {
  try {
    if (email && password) {
      let users = JSON.parse(window.getLocalUsers());
      let found = false;
      let user = null;
      if (users.length) {
        for (const iterator of users) {
          if (iterator.email === email && iterator.password === password) {
            found = true;
            user = iterator;
            break;
          }
        }
        if (found) {
          window.setCurrentUser(user);
        }
        return found;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in func login:", error);
  }
};

window.isUserAlreadyRegister = function (email) {
  try {
    if (typeof email === "string" && email.length > 0) {
      let users = JSON.parse(window.getLocalUsers());
      if (users.length) {
        let found = false;
        for (const iterator of users) {
          if (iterator.email === email) {
            found = true;
            break;
          }
        }
        return found;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.error("Error in func isUserAlreadyRegister:", error);
  }
};
window.registerUser = function (user) {
  try {
    let users = getLocalUsers().length
      ? JSON.parse(getLocalUsers())
      : getLocalUsers();
    users.push(user);
    users = JSON.stringify(users);
    localStorage.setItem("users", users);
    return true;
  } catch (error) {
    console.error("Error in function registerUser", error);
    return false;
  }
};

window.setCurrentUser = function (user) {
  sessionStorage.setItem("currentUser", JSON.stringify(user));
};

window.getCurrentUser = function () {
  return sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser"))
    : null;
};

window.isLoggedIn = function () {
  if (getCurrentUser()) return true;
  return false;
};

window.logOut = function () {
  sessionStorage.clear();
  window.location.reload();  
};
