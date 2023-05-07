import React, { useEffect } from "react";
import Login from "./Login";
import "./App.css";
import { getTokenFromUrl } from "./beats";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const beats = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      console.log("[token]", token);
      beats.setAccessToken(_token);
      beats.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });
      beats.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
      beats.getPlaylist("201ba3c7dcbe4aef8046a37419940230").then((playlist) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: playlist,
        });
      });
    }
  }, [token, dispatch]);

  return (
    <div className="App">
      {token ? <Player beats={beats} /> : <Login />}
    </div>
  );
}

export default App;

