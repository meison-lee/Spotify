import requests
import json
import psycopg2
conn = psycopg2.connect(database="test", user="meisonlee", password="meison0520", host="localhost", port="5432")
cur = conn.cursor()

def refresh_token():
    url = "https://accounts.spotify.com/api/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type":"client_credentials",
        "client_id":"0ecb0ae7782f4620981e214fbd126ff8",
        "client_secret":"cc57b606ba9e422ba68781b1f1566a5c"
    }
    res = requests.post(url, headers=headers, data=data).text
    res = json.loads(res)
    return res['access_token']

def spotify_request(url):
    headers = {"Authorization": "Bearer " + refresh_token()}
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print('Error:', response)
    return response.json()

Spotify_artistID = '2elBjNSdBE2Y3f0j1mjrql' # get artist ID manually

artist = spotify_request(f'https://api.spotify.com/v1/artists/{Spotify_artistID}')
cur.execute("SELECT artistid FROM artists WHERE artist_name = %s ", (artist['name'],))
artistID = cur.fetchone()[0]
if artistID is None:
    cur.execute("INSERT INTO artists (artist_name, email, image_url) VALUES (%s, %s, %s) RETURNING artistID", (artist['name'], artist['id']+'@gmail.com', artist['images'][0]['url']))
    conn.commit()
    artistID = cur.fetchone()[0]

# print(artistID)
albums = spotify_request(f'https://api.spotify.com/v1/artists/{Spotify_artistID}/albums')
for i in range(0, len(albums['items'])):
    print("album name: ", albums['items'][i]['name'])
    Spotify_albumID = albums['items'][i]['id']
    album = spotify_request(f'https://api.spotify.com/v1/albums/{Spotify_albumID}')
    cur.execute("SELECT albumid FROM albums WHERE album_name = %s and artistid = %s", (album['name'], artistID))
    albumID = cur.fetchone()
    if albumID is None:
        cur.execute("INSERT INTO albums (artistid, album_name, album_artwork, release_date ) VALUES (%s, %s, %s, %s) RETURNING albumid", (artistID, album['name'], album['images'][0]['url'], album['release_date']))
        conn.commit()
        albumID = cur.fetchone()[0]


    for i in range(len(album['tracks']['items'])):
        print("track name: ", album['tracks']['items'][i]['name'])
        name = album['tracks']['items'][i]['name']
        duration = album['tracks']['items'][i]['duration_ms']
        # print(albumID, artistID, name, duration, album['images'][0]['url'])
        cur.execute("SELECT trackid FROM tracks WHERE track_name = %s and albumid = %s", (name, albumID))
        trackID = cur.fetchone()
        if trackID is None:
            cur.execute("INSERT INTO tracks (albumid, artistid, track_name, track_length, track_artwork) VALUES (%s, %s, %s,%s, %s) RETURNING trackid", (albumID, artistID, name, duration, album['images'][0]['url']))
            conn.commit()
            trackID = cur.fetchone()[0]


# album = spotify_request(f'https://api.spotify.com/v1/albums/{Spotify_albumID}')

# print(album['tracks']['items'][0])

# albumID = albums['items'][0]['id']
# print(albums['items'][0]['name'])
# print(tracks['items'][1])
# print(tracks['items'][0]['name'], tracks['items'][0]['duration_ms'])
# for i in range(0, len(tracks['items'])):
#     print(tracks['items'][i]['name'])
#     print(tracks['items'][i]['id'])

# main = soup.find(id='main-content')