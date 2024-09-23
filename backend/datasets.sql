-- Insert artists (assuming artistID is generated as UUID)
INSERT INTO artists ( artist_name, email) VALUES
( 'Pink Floyd', 'PinkFloyd@gmail.com'),
( 'The Beatles', 'beatles@gmail.com'),
( 'Michael Jackson', 'jackson@gmail.com'),
( 'AC/DC', 'acdc@gmail.com'),
( 'Eagles', 'eagles@gmail.com'),
( 'U2', 'u2@gmail.com'),
( 'Nirvana','nirvana@gmail.com'),
( 'Fleetwood Mac', 'mac@gmail.com'),
( 'Bruce Springsteen', 'bruceSprinteen@gmail.com')
ON CONFLICT (artist_name) DO NOTHING;


-- Insert albums (assuming albumID is generated as UUID)
INSERT INTO albums (album_name, release_date, artistID) VALUES
('Dark Side of the Moon', '1973-03-01', (SELECT artistID FROM artists WHERE artist_name = 'Pink Floyd')),
('Abbey Road', '1969-09-26', (SELECT artistID FROM artists WHERE artist_name = 'The Beatles')),
('Thriller', '1982-11-30', (SELECT artistID FROM artists WHERE artist_name = 'Michael Jackson')),
('Back in Black', '1980-07-25', (SELECT artistID FROM artists WHERE artist_name = 'AC/DC')),
('Hotel California', '1976-12-08', (SELECT artistID FROM artists WHERE artist_name = 'Eagles')),
('The Joshua Tree', '1987-03-09', (SELECT artistID FROM artists WHERE artist_name = 'U2')),
('Nevermind', '1991-09-24', (SELECT artistID FROM artists WHERE artist_name = 'Nirvana')),
('Rumours', '1977-02-04', (SELECT artistID FROM artists WHERE artist_name = 'Fleetwood Mac')),
('Born to Run', '1975-08-25', (SELECT artistID FROM artists WHERE artist_name = 'Bruce Springsteen'))
('The Wall', '1979-11-30', (SELECT artistID FROM artists WHERE artist_name = 'Pink Floyd'));


-- Insert tracks for "Dark Side of the Moon"
INSERT INTO tracks (track_name, track_length, genre, avg_rating, number_of_ratings, descriptor, albumID, artistID) VALUES
('Speak to Me', 90, 'Progressive Rock', 4.8, 5000, 'Atmospheric',
    (SELECT albumID FROM albums WHERE album_name = 'Dark Side of the Moon'),
    (SELECT artistID FROM artists WHERE artist_name = 'Pink Floyd')),
('Breathe', 163, 'Progressive Rock', 4.7, 4800, 'Psychedelic',
    (SELECT albumID FROM albums WHERE album_name = 'Dark Side of the Moon'),
    (SELECT artistID FROM artists WHERE artist_name = 'Pink Floyd')),
('Time', 408, 'Progressive Rock', 4.9, 5200, 'Timeless',
    (SELECT albumID FROM albums WHERE album_name = 'Dark Side of the Moon'),
    (SELECT artistID FROM artists WHERE artist_name = 'Pink Floyd')),

-- Insert tracks for "Abbey Road"
('Come Together', 259, 'Rock', 4.8, 6000, 'Classic',
    (SELECT albumID FROM albums WHERE album_name = 'Abbey Road'),
    (SELECT artistID FROM artists WHERE artist_name = 'The Beatles')),
('Something', 182, 'Pop', 4.9, 5800, 'Romantic',
    (SELECT albumID FROM albums WHERE album_name = 'Abbey Road'),
    (SELECT artistID FROM artists WHERE artist_name = 'The Beatles')),
('Here Comes the Sun', 185, 'Pop', 5.0, 7500, 'Bright',
    (SELECT albumID FROM albums WHERE album_name = 'Abbey Road'),
    (SELECT artistID FROM artists WHERE artist_name = 'The Beatles')),

-- Insert tracks for "Thriller"
('Thriller', 358, 'Pop', 5.0, 8000, 'Iconic',
    (SELECT albumID FROM albums WHERE album_name = 'Thriller'),
    (SELECT artistID FROM artists WHERE artist_name = 'Michael Jackson')),
('Beat It', 258, 'Rock', 4.9, 7900, 'Energetic',
    (SELECT albumID FROM albums WHERE album_name = 'Thriller'),
    (SELECT artistID FROM artists WHERE artist_name = 'Michael Jackson')),
('Billie Jean', 294, 'Pop', 4.9, 7700, 'Groovy',
    (SELECT albumID FROM albums WHERE album_name = 'Thriller'),
    (SELECT artistID FROM artists WHERE artist_name = 'Michael Jackson')),

-- Insert tracks for "Back in Black"
('Hells Bells', 312, 'Hard Rock', 4.7, 4600, 'Heavy',
    (SELECT albumID FROM albums WHERE album_name = 'Back in Black'),
    (SELECT artistID FROM artists WHERE artist_name = 'AC/DC')),
('Back in Black', 255, 'Hard Rock', 4.8, 4900, 'Anthemic',
    (SELECT albumID FROM albums WHERE album_name = 'Back in Black'),
    (SELECT artistID FROM artists WHERE artist_name = 'AC/DC')),
('Shoot to Thrill', 316, 'Hard Rock', 4.8, 4500, 'Energetic',
    (SELECT albumID FROM albums WHERE album_name = 'Back in Black'),
    (SELECT artistID FROM artists WHERE artist_name = 'AC/DC')),

-- Tracks for "Hotel California"
('Hotel California', 390, 'Rock', 5.0, 7500, 'Classic',
    (SELECT albumID FROM albums WHERE album_name = 'Hotel California'),
    (SELECT artistID FROM artists WHERE artist_name = 'Eagles')),
('New Kid in Town', 300, 'Rock', 4.7, 4600, 'Smooth',
    (SELECT albumID FROM albums WHERE album_name = 'Hotel California'),
    (SELECT artistID FROM artists WHERE artist_name = 'Eagles')),
('Life in the Fast Lane', 285, 'Rock', 4.8, 4900, 'Upbeat',
    (SELECT albumID FROM albums WHERE album_name = 'Hotel California'),
    (SELECT artistID FROM artists WHERE artist_name = 'Eagles')),

-- Tracks for "The Joshua Tree"
('Where the Streets Have No Name', 330, 'Rock', 4.8, 5700, 'Uplifting',
    (SELECT albumID FROM albums WHERE album_name = 'The Joshua Tree'),
    (SELECT artistID FROM artists WHERE artist_name = 'U2')),
('I Still Haven’t Found What I’m Looking For', 277, 'Rock', 4.7, 5400, 'Reflective',
    (SELECT albumID FROM albums WHERE album_name = 'The Joshua Tree'),
    (SELECT artistID FROM artists WHERE artist_name = 'U2')),
('With or Without You', 296, 'Rock', 5.0, 6800, 'Emotional',
    (SELECT albumID FROM albums WHERE album_name = 'The Joshua Tree'),
    (SELECT artistID FROM artists WHERE artist_name = 'U2')),

-- Tracks for "Nevermind"
('Smells Like Teen Spirit', 301, 'Grunge', 4.9, 9000, 'Raw',
    (SELECT albumID FROM albums WHERE album_name = 'Nevermind'),
    (SELECT artistID FROM artists WHERE artist_name = 'Nirvana')),
('Come as You Are', 219, 'Grunge', 4.8, 8700, 'Distorted',
    (SELECT albumID FROM albums WHERE album_name = 'Nevermind'),
    (SELECT artistID FROM artists WHERE artist_name = 'Nirvana')),
('Lithium', 257, 'Grunge', 4.7, 8500, 'Aggressive',
    (SELECT albumID FROM albums WHERE album_name = 'Nevermind'),
    (SELECT artistID FROM artists WHERE artist_name = 'Nirvana')),

-- Tracks for "Rumours"
('Dreams', 258, 'Pop', 4.9, 6500, 'Chill',
    (SELECT albumID FROM albums WHERE album_name = 'Rumours'),
    (SELECT artistID FROM artists WHERE artist_name = 'Fleetwood Mac')),
('Go Your Own Way', 217, 'Rock', 4.8, 6200, 'Energetic',
    (SELECT albumID FROM albums WHERE album_name = 'Rumours'),
    (SELECT artistID FROM artists WHERE artist_name = 'Fleetwood Mac')),
('The Chain', 273, 'Rock', 4.9, 6600, 'Dark',
    (SELECT albumID FROM albums WHERE album_name = 'Rumours'),
    (SELECT artistID FROM artists WHERE artist_name = 'Fleetwood Mac')),

-- Tracks for "Born to Run"
('Born to Run', 279, 'Rock', 4.9, 7000, 'Uplifting',
    (SELECT albumID FROM albums WHERE album_name = 'Born to Run'),
    (SELECT artistID FROM artists WHERE artist_name = 'Bruce Springsteen')),
('Thunder Road', 286, 'Rock', 5.0, 6800, 'Nostalgic',
    (SELECT albumID FROM albums WHERE album_name = 'Born to Run'),
    (SELECT artistID FROM artists WHERE artist_name = 'Bruce Springsteen')),
('Jungleland', 563, 'Rock', 4.8, 6000, 'Epic',
    (SELECT albumID FROM albums WHERE album_name = 'Born to Run'),
    (SELECT artistID FROM artists WHERE artist_name = 'Bruce Springsteen')),

-- Insert tracks for "The Wall"
('Another Brick in the Wall, Pt. 2', 236, 'Progressive Rock', 4.9, 5500, 'Rebellious',
    (SELECT albumID FROM albums WHERE album_name = 'The Wall'),
    (SELECT artistID FROM artists WHERE artist_name = 'Pink Floyd')),
('Comfortably Numb', 384, 'Progressive Rock', 5.0, 6000, 'Dreamlike',
    (SELECT albumID FROM albums WHERE album_name = 'The Wall'),
    (SELECT artistID FROM artists WHERE artist_name = 'Pink Floyd')),
('Run Like Hell', 258, 'Progressive Rock', 4.8, 4800, 'Fast-paced',
    (SELECT albumID FROM albums WHERE album_name = 'The Wall'),
    (SELECT artistID FROM artists WHERE artist_name = 'Pink Floyd'));
