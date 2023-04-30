import React, { useEffect, useState } from "react";
import './App.css';
import Login from './Login';
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
      beats.getPlaylist("37i9dQZF1E34Ucml4HHx1w").then((playlist) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: playlist,
        });
      });
    }
  }, []);

  return (
    <div className="App">
     {token ? <h1>Logged in</h1> : <Login />}
    </div>
  );
}

export default App;
