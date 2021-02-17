import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      id: "",
      email: "",
      password: "",
      first_name: ""
    },
    searchresult: [],
    song: {
      title: "",
      artist: "",
      cover: ""
    },
    playlists: [],
    currentSong: "",
    userplaylist: []
  },
  mutations: {
    // register: (state, user)=>{
    //   state.users.push(user)
    // }
    register(state, value) {
      state.user = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setSearchResults(state, value) {
      state.searchresult = value;
    },
    setPlaylists(state, value) {
      state.playlists = value;
    },
    setUserPlaylist(state, value) {
      state.userplaylist = value;
    },
    logoutUser(state, value) {
      state.user.loggedIn = value;
    }
  },
  actions: {
    async registerUser({ commit }, user) {
      let response = await fetch("http://localhost:3000/api/users", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
      console.log("SUCCESS");
      await response.json();
      commit("register", user);
    },
    async login({ dispatch }, credentials) {
      console.log(credentials);
      let response = await fetch("http://localhost:3000/api/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(credentials)
      });
      await response.json();
      if (response.status !== 200) {
        console.log("FAILED LOGIN");
        return;
      }

      dispatch("checkAuth");
    },
    async checkAuth({ commit }) {
      let response = await fetch("http://localhost:3000/api/login", {
        credentials: "include",
        mode: "cors"
      });
      // TODO Should check response so that we are really logged in
      let data = await response.json();
      let user = data;
      commit("setUser", user);
    },
    async logout({ commit }) {
      let response = await fetch("http://localhost:3000/api/login", {
        method: "delete", 
        headers: { "Content-Type": "application/json" },
        mode: "cors"
      });
      let user = await response.json();
      commit("logoutUser", user);
      console.log("Logout done");
    },
    async search({ commit }, search_query) {
      console.log(search_query);
      let response = await fetch(
        "http://localhost:3000/api/yt/songs/" + search_query + "+",
        { credentials: "include", mode: "cors" }
      );
      let data = await response.json();
      commit("setSearchResults", data.content);
      //dispatch('setSearch', searchRes)
    },
    async setSearch({ commit }, searchRes) {
      console.log(JSON.stringify(searchRes));
      // let x = JSON.parse(searchRes);
      //console.log(searchRes);
      commit("setSearchResults", searchRes);
    },
    async loadPlaylists({ commit }) {
      console.log(this.state.user.id);
      let response = await fetch(
        "http://localhost:3000/api/playlist/" + this.state.user.id,
        { credentials: "include", mode: "cors" }
      );
      let data = await response.json();
      console.log(JSON.stringify(data));
      commit("setPlaylists", data);
    },
    async addToPlayList({ commit }, { playlist_id, song }) {
      // lägg in låten i låttabellen
      //koppla till en playlist, mellantabellen
      //let playListId=2;
      console.log("Innan fetch, skriv ut song:", JSON.stringify(song));
      console.log(
        "Innan fetch, skriv ut playlist_id:",
        JSON.stringify(playlist_id)
      );
      let response = await fetch("http://localhost:3000/api/songlink", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playlist_id: playlist_id,
          song: song
        })
      });
      await response.json();
      commit("loadPlayList");
    },
    async removeFromPlaylist({dispatch}, value){
      let response = await fetch("http://localhost:3000/api/playlistsong", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        mode: "cors",
        body: JSON.stringify({
          playlist_id: value.playlist_id,
          songlink_id: value.songlink_id
        })
      });
      await response.json();
      dispatch("getPlaylist", value.playlist_id);
    },
    async getPlaylist({ commit }, userPlaylistId) {
      console.log(userPlaylistId);
      let response = await fetch(
        "http://localhost:3000/api/playlistsong/" + userPlaylistId,
        { credentials: "include", mode: "cors" }
      );
      let data = await response.json();
      let result = [];
      for (let i = 0; i < data.length; i++) {
        console.log("dataindex", i);
        console.log(
          "Data PAAAAAAAAAAARRRRRRRRRSSSSSSSSEEEEEEEEE--------------",
          JSON.parse(data[i].songlink)
        );
        let songRow = data[i]; //hela objektet
        let song = JSON.parse(songRow.songlink); //tar ut songlinken och parsar
        song.songlink_id = songRow.songlink_id; //kopíerar över songlink_id till song-objektet
        song.playlist_id = songRow.playlist_id;
        result.push(song);
      }
      commit("setUserPlaylist", result);
    },
    async createPlaylist({ dispatch }, input) {
      
      console.log('item',  input)
      console.log('stringify item', JSON.stringify(input))

      let response = await fetch("http://localhost:3000/api/playlist", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({playlist_name:input})
      });
      await response.json();
      console.log(JSON.stringify(response))
      dispatch("loadPlaylists");
    },
    //Delete playlist, "deletePlaylist(playlist.playlist_id)"
    async deletePlaylist({ dispatch }, playlist_id) {
      
      console.log('playlist_id',  playlist_id)

      let response = await fetch("http://localhost:3000/api/playlist", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({playlist_id:playlist_id})
      });
      await response.json();
      console.log(JSON.stringify(response))
      dispatch("loadPlaylists");
    }
  },
  getters: {
    searchResult(state) {
      return state.searchresult;
    }
  },
  modules: {}

});
