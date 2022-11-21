import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica
} from "./styled";
import { header, BASE_URL } from "../../constants/constants";

const musicasLocal = [
  {
    artist: "Artista 1",
    id: "1",
    name: "Musica1",
    url: "http://spoti4.future4.com.br/1.mp3"
  },
  {
    artist: "Artista 2",
    id: "2",
    name: "Musica2",
    url: "http://spoti4.future4.com.br/2.mp3"
  },
  {
    artist: "Artista 3",
    id: "3",
    name: "Musica3",
    url: "http://spoti4.future4.com.br/3.mp3"
  }
];

export default function Musicas(props) {
  const [musicas, setMusicas] = useState(musicasLocal);
  const [inputArtista, setInputArtista] = useState("");
  const [inputMusica, setInputMusica] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  const getPlaylistTracks = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}${props.playlist.id}/tracks
      `,
        header
      );
      setMusicas(response.data.result.tracks);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getPlaylistTracks();
  }, []);

  const addTrackToPlaylist = async () => {
    const body = {
      artist: inputArtista,
      name: inputMusica,
      url: inputUrl
    };
    try {
      await axios.post(
        `${BASE_URL}${props.playlist.id}/tracks
        `,
        body,
        header
      );
      getPlaylistTracks();
    } catch (error) {
      console.log(error.response);
    }
  };
  const deleteTrack = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}${props.playlist.id}/tracks/${id}
      `,
        header
      );
      console.log(response.data);
      getPlaylistTracks();
    } catch (error) {
      console.log(error.mensage);
    }
  };

  const deletePlaylist = async () => {
    try {
      await axios.delete(`${BASE_URL}${props.playlist.id}`, header);
      props.getAllPlaylists();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={() => deleteTrack(musica.id)}>X</button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica
          inputArtista={inputArtista}
          onChange={(e) => {
            setInputArtista(e.target.value);
          }}
          placeholder="artista"
        />
        <InputMusica
          inputMusica={inputMusica}
          onChange={(e) => {
            setInputMusica(e.target.value);
          }}
          placeholder="musica"
        />
        <InputMusica
          inputUrl={inputUrl}
          onChange={(e) => {
            setInputUrl(e.target.value);
          }}
          placeholder="url"
        />
        <Botao onClick={addTrackToPlaylist}>Add music</Botao>
      </ContainerInputs>
      <button onClick={deletePlaylist}>Delete Playlist</button>
    </ContainerMusicas>
  );
}
