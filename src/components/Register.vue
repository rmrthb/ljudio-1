<template>
  <div id="register-container">
    <div id="modal-register">
      <div id="modal-register-content">
        <div id="logo-container">
          <a href="#" @click="loginLink"
            ><img id="logo-img" src="../assets/logo.png"
          /></a>
        </div>
        <form @submit.prevent="registerUser">
          <div id="register-user-container">
            <input
              v-model="user.email"
              type="text"
              placeholder="Email"
              required
            />
            <br />
            <input
              v-model="user.password"
              type="password"
              placeholder="Password"
              required
            />
            <br />
            <input
              v-model="user.first_name"
              type="text"
              placeholder="First name"
              required
            />
            <br />
            <input
              v-model="user.last_name"
              type="text"
              placeholder="Last name"
              required
            />
            <br />
          </div>
          <button type="submit">Register</button>
        </form>
        <div id="footer">
          <h6>© G E J M R</h6>
          <img id="footer-img" src="../assets/logo-no-text.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      user: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      },
    };
  },
  methods: {
    registerUser() {
      let user = {
        email: this.user.email,
        password: this.user.password,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
      };

      this.$store.dispatch("registerUser", user);
      this.$router.go(0);
    },

    showElement() {
      let modal = document.getElementById("register-container");
      modal.style.display = "none";
      let modalRegister = document.getElementById("container");
      modalRegister.style.display = "block";
    },
    loginLink() {
      this.$emit("loginClick");
    },
  },
};
</script>

<style scoped>
#register-container {
  background-image: url("https://img.wallpapersafari.com/desktop/1680/1050/63/21/wU4tOM.jpg");
  background-size: cover;
  height: 100vh;
  width: 100vw;
  padding: 0vw;
  margin: 0;
}

#logo-container {
  height: 12vh;
}

/* The Modal (background) */
#modal-register {
  margin-left: 35vw;
  padding-top: 30vh;
  width: 25%;
  overflow: auto;
}

/* Modal Content/Box */
#modal-register-content {
  position: relative;
  background: linear-gradient(rgb(46, 114, 230), rgb(21, 68, 150));
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 0.35vw solid rgb(21, 68, 150);
  border-radius: 0.5vw;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 80%;
  animation-name: animatetop;
  animation-duration: 0.85s;
}

#logo-img {
  width: 12vh;
  transform: scale(1.1);
}

#register-user-container > input {
  border: 0.2vw solid rgb(8, 23, 237);
  border-radius: 0.32vw;
  margin-bottom: 0.45vh;
  height: 2vh;
  text-align: center;
  font-family: "Nunito", sans-serif;
  background: transparent;
  color: white;
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

#register-user-container > input::placeholder {
  font-family: "Nunito", sans-serif;
  text-align: center;
  font-size: 125%;
  color: white;
}

#footer {
  color: white;
  margin-top: 2vh;
  display: flex;
  justify-content: center;
}

#footer-img {
  width: 1.5vw;
  margin-left: 1.05vw;
}

#footer > h6 {
  margin-top: 0.85vh;
}

button {
  margin-top: 1vh;
  margin-bottom: 1vh;
  background: transparent;
  border: 0.2vw solid rgb(8, 23, 237);
  border-radius: 0.5vw;
  font-family: "Nunito", sans-serif;
  font-size: 115%;
  color: white;
  cursor: pointer;
}

@media screen and (orientation: portrait) {
  #modal-register {
    margin-left: 7vw;
    padding-top: 15vh;
    width: 90%;

    overflow: auto;
  }
  #modal-register-content {
    position: relative;
    background: linear-gradient(rgb(46, 114, 230), rgb(21, 68, 150));
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 0.35vw solid rgb(21, 68, 150);
    border-radius: 0.5vw;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 80%;
    animation-name: animatetop;
    animation-duration: 0.85s;
  }
  #register-user-container > input {
    border: 0.2vw solid rgb(8, 23, 237);
    border-radius: 0.32vw;
    margin-bottom: 0.45vh;
    height: 4vh;
    text-align: center;
    font-family: "Nunito", sans-serif;
    background: transparent;
    color: white;
  }
  #footer-img {
    width: 6vw;
     margin-left: 1.05vw;
  }
}
</style>
