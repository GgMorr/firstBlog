const signupFormHandler = async function(event) {
    event.preventDefault();

    const usernameEl = document.querySelector("#username-signup");
    const passwordEl = document.querySelector("#password-signup");
    const emailEl = document.querySelector("#email-signup");
    fetch("/api/user/", {
      method: "POST",
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
        email: emailEl.value
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function() {
        document.location.replace("/dashboard");
      })
      .catch(err => console.log(err));
  };

  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);