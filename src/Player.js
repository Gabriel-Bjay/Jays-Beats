import React from "react";
import "./Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

function Player({ beats, user }) {
  if (user === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className="player">
      <div className="player__body">
      <h1>Welcome, {user.display_name}!</h1>
        <Sidebar />
        <Body beats={beats} />
      </div>
      <Footer />
    </div>
  );
}

export default Player;