<template>
  <div id="container">
    <div id="modal">
      <div id="modal-content">
        <div id="logo-container">
          <img id="logo-img" src="../assets/logo.png" />
        </div>
        <form @submit.prevent>
          <div id="userinfo-container">
            <input v-model="email" placeholder="Email" required />
            <br />
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" @click="login()">Login</button>
        </form>
        <p>Not a registered user?</p>
        <a href="#" @click="registerLink">Click here!</a>
        <div id="modal-footer">
          <h6>© G E J M R</h6>
          <img id="footer-img" src="../assets/logo-no-text.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      loginMode: true,
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },

    registerLink() {
      this.$emit("registerClick");
    },
  },
};
</script>

<style scoped>
#container {
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
#modal {
  margin-left: 35vw;
  padding-top: 30vh;
  width: 25%;
  overflow: auto;
}
#modal-content {
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

#userinfo-container > input {
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

#userinfo-container > input::placeholder {
  font-family: "Nunito", sans-serif;
  text-align: center;
  font-size: 125%;
  color: white;
}

#modal-footer {
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

p {
  color: white;
}

a {
  cursor: pointer;
}

@media screen and (orientation: portrait) {
  #modal {
    margin-left: 7vw;
    padding-top: 15vh;
    width: 90%;

    overflow: auto;
  }
  #modal-content {
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
  #userinfo-container > input {
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
