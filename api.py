import spotipy
import pylast
from spotipy import SpotifyClientCredentials

# Authorization data
import api

spotify_client_id = ''
spotify_client_secret = ''
redirect_uri = 'http://localhost:3000/'
spotify_username = ''
scope = 'playlist-modify-public'
lastfm_api_key = ""
lastfm_secret_key = ""

# Credentials to access the Spotify Music Data
manager = SpotifyClientCredentials(spotify_client_id, spotify_client_secret)
sp = spotipy.Spotify(client_credentials_manager=manager)

# Access to the last.fm API
network = pylast.LastFMNetwork(
    api_key=lastfm_api_key,
    api_secret=lastfm_secret_key,
)


def get_top_tag_last(name, title):
    track = network.get_track(name, title)
    try:
        top_tag = track.get_top_tags(1)
    except:
        print('No song in last')
        return None
    if len(top_tag) <= 0:
        return None
    else:
        return top_tag[0].item.name


def get_songs_features(ids):
    metadata = sp.track(ids)
    features = sp.audio_features(ids)

    # meta
    name = metadata['name']
    album = metadata['album']['name']
    artist = metadata['album']['artists'][0]['name']
    release_date = metadata['album']['release_date']
    length = metadata['duration_ms']
    popularity = metadata['popularity']
    song_id = metadata['id']

    # features
    acousticness = features[0]['acousticness']
    danceability = features[0]['danceability']
    energy = features[0]['energy']
    instrumentalness = features[0]['instrumentalness']
    liveness = features[0]['liveness']
    valence = features[0]['valence']
    loudness = features[0]['loudness']
    speechiness = features[0]['speechiness']
    tempo = features[0]['tempo']
    key = features[0]['key']
    time_signature = features[0]['time_signature']

    track = [name, album, artist, song_id, release_date, popularity, length, danceability, acousticness,
             energy, instrumentalness, liveness, valence, loudness, speechiness, tempo, key, time_signature]
    columns = ['name', 'album', 'artist', 'id', 'release_date', 'popularity', 'length', 'danceability', 'acousticness',
               'energy', 'instrumentalness',
               'liveness', 'valence', 'loudness', 'speechiness', 'tempo', 'key', 'time_signature']
    return track, columns


def search_track(artist, title):
    query = artist + " " + title
    found_track = sp.search(query, limit=1, type='track')

    if len(found_track['tracks']['items']) > 0:
        song_id = found_track['tracks']['items'][0]['id']
        return song_id
    else:
        return None


def get_data_from_file(path_song_metadata):
    import pandas as pd
    song_metadata = pd.read_csv("new.csv", delimiter=';', encoding='latin')
    # song_data = pd.read_csv(path_song_data, delimiter=';')

    for index, row in song_metadata.iterrows():
        song_id = helpers.search_track(row['metadata.artist'], row['metadata.title'])
        if song_id is not None:
            details, columns = helpers.get_songs_features(song_id)
            if len(details[columns.index('release_date')]) < 10:
                details[columns.index('release_date')] = details[columns.index('release_date')] + "-01-01"

            valence = row['Valence(mean)']
            arousal = row['Arousal(mean)']
            # valence = float((song_data.loc[song_data['song_id'] == row['song_id']])['moved_valence_mean'].iloc[0].replace(',','.'))
            # arousal = float((song_data.loc[song_data['song_id'] == row['song_id']])['moved_arousal_mean'].iloc[0].replace(',','.'))
            # quadrant = row['Quadrant']
            # switch={
            #     'Q1': 'happy',
            #     'Q2': 'energetic',
            #     'Q3': 'sad',
            #     'Q4': 'calm'
            # }
            # emotion = switch.get(quadrant)
            if valence >= 0.5:
                if arousal >= 0.5:
                    emotion = 'happy'  # Q1
                else:
                    emotion = 'calm'  # Q4
            else:
                if arousal >= 0.5:
                    emotion = 'energetic'  # Q2
                else:
                    emotion = 'sad'  # Q3

            new_track = Song(name=details[columns.index('name')],
                             album=details[columns.index('album')],
                             artist=details[columns.index('artist')],
                             id=details[columns.index('id')],
                             release_date=datetime.strptime(details[columns.index('release_date')],
                                                            '%Y-%m-%d').date(),
                             popularity=details[columns.index('popularity')],
                             length=details[columns.index('length')],
                             danceability=details[columns.index('danceability')],
                             acousticness=details[columns.index('acousticness')],
                             energy=details[columns.index('energy')],
                             instrumentalness=details[columns.index('instrumentalness')],
                             liveness=details[columns.index('liveness')],
                             valence=details[columns.index('valence')],
                             loudness=details[columns.index('loudness')],
                             speechiness=details[columns.index('speechiness')],
                             tempo=details[columns.index('tempo')],
                             key=details[columns.index('key')],
                             time_signature=details[columns.index('time_signature')],
                             # gender=song['gender'] if 'gender' in song else None,
                             # age=int(song['age']) if 'age' in song else None,
                             # personality=song['personality'] if 'personality' in song else None,
                             # mood_before=song['rnFeelings'] if 'rnFeelings' in song else None,
                             emotion=emotion,
                             genre="genre",
                             metadata_arousal=arousal,
                             metadata_valence=valence)

            print(new_track)
            try:
                db.session.add(new_track)
                db.session.commit()
            except Exception as err:
                db.session.rollback()
                print(err)
                print("Problem with adding new song to database")
            else:
                print("Added new track!")
        else:
            continue


def update_all():
    rows = Song.query.all()
    for row in rows:
        genre = helpers.get_top_tag_last(row.artist, row.name)
        print(row.artist, row.name, genre)
        row.genre = genre
        db.session.commit()
        print("Updated")


def update_genre():
    songs = db.session.query(Song).offset(774).all()
    for song in songs:
        last_genre = helpers.get_top_tag_last(song.artist, song.name)
        print(song.name + ' ' + str(last_genre))
        query = song.album + " " + song.artist
        search_album_genre_result = helpers.sp.search(query, limit=1, type='album')

        if len(search_album_genre_result['albums']['items']) > 0:
            if 'genres' in search_album_genre_result['albums']['items'][0]:
                spotify_genre = search_album_genre_result['albums']['items'][0]['genres']
            else:
                search_artist_genre_result = helpers.sp.search(song.artist, limit=1, type='artist')
                if len(search_artist_genre_result['artists']['items']) > 0:
                    spotify_genre = search_artist_genre_result['artists']['items'][0]['genres']
                else:
                    spotify_genre = None
        else:
            search_artist_genre_result = helpers.sp.search(song.artist, limit=1, type='artist')
            if len(search_artist_genre_result['artists']['items']) > 0:
                spotify_genre = search_artist_genre_result['artists']['items'][0]['genres']
            else:
                spotify_genre = None

        if spotify_genre is not None:
            if last_genre in spotify_genre:
                song.genre = last_genre
            else:
                song.genre = ','.join(spotify_genre)
        else:
            song.genre = last_genre

        try:
            db.session.commit()
        print("Updated track")
        except Exception as err:
            db.session.rollback()
            print(err)
            print("Problem with updating genre in database")
