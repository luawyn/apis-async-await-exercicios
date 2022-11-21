import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";
import { header, BASE_URL } from "../../constants/constants";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");
  const [namePlaylist, setNamePlaylist] = useState("");

  useEffect(() => {
    getAllPlaylists();
  }, []);

  const getAllPlaylists = async () => {
    try {
      const response = await axios.get(BASE_URL, header);
      setPlaylists(response.data.result.list);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createPlaylist = async () => {
    const body = {
      name: namePlaylist
    };
    try {
      await axios.post(BASE_URL, body, header);
      getAllPlaylists();
    } catch (error) {
      console.log(error.response);
    }
  };

  const searchPlaylist = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}search?name=${name}`,
        header
      );
      setPlaylists(response.data.result.playlist);
    } catch (error) {
      console.log(error.response);
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNamePlaylist = (e) => {
    setNamePlaylist(e.target.value);
  };
  return (
    <div>
      {playlists.map((playlist) => {
        return (
          <Musicas
            key={playlist.id}
            playlist={playlist}
            getAllPlaylists={getAllPlaylists}
          />
        );
      })}
      <input
        value={namePlaylist}
        onChange={onChangeNamePlaylist}
        placeholder="Playlist name"
      />
      <button type="submit" onClick={createPlaylist}>
        Create Playlist
      </button>
      <input value={name} onChange={onChangeName} placeholder="Playlist name" />
      <button type="submit" onClick={searchPlaylist}>
        Search Playlist
      </button>
      <button onClick={getAllPlaylists}>Reload Playlists</button>
    </div>
  );
}

export default Playlists;
