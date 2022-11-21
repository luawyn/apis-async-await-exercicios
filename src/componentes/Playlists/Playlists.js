import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

const playlistsLocal = [
  {
    id: 1,
    name: "Playlist 1"
  },
  {
    id: 2,
    name: "Playlist 2"
  },
  {
    id: 3,
    name: "Playlist 3"
  },
  {
    id: 4,
    name: "Playlist 4"
  }
];
function Playlists() {
  const [playlists, setPlaylists] = useState(playlistsLocal);
  const header = {
    headers: {
      Authorization: "luana-trevizani-ammal"
    }
  };
  const getAllPlaylists = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        header
      )
      .then((response) => {
        console.log(response.data);
        setPlaylists(response.data.result.list);
      })
      .catch((error) => {
        console.log("Deu erro");
        console.log(error);
      });
  };
  useEffect(() => {
    getAllPlaylists();
  }, []);
  return (
    <div>
      {playlists.map((playlist) => {
        return <Musicas key={playlist.id} playlist={playlist} />;
      })}
    </div>
  );
}

export default Playlists;
