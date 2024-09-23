import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/album');
        const data = response.data;
        console.log("response", response.data);
        setAlbums(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleClick = (albumid) => {
    console.log("in album albumid", albumid);
    navigate(`/album/${albumid}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Albums</h1>
      <div className="album-list">
        {albums.map((album) => (
          <div key={album.albumid} className="album-card" onClick={() => handleClick(album.albumid)}>
              <img className="album-artwork" src={require(`../covers/${album.album_artwork}.jpg`)} alt={`${album.album_name} cover`} />
            <div className="album-info">
              <h2 className="album-name">{album.album_name}</h2>
              <p className="artist-name">{album.artist_name}</p>
              <p className="release-date">{album.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
