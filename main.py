import sqlite3

from flask import Flask, render_template, request, redirect, url_for, after_this_request
from flask_sqlalchemy import SQLAlchemy
from .api import search_track, get_songs_features#, get_top_tag_last
from flask_cors import CORS
from datetime import datetime
import logging

app = Flask(__name__, static_folder='build/static', template_folder='build')
CORS(app, resources={r"/*": {"origins": "*"}})
print("Setting up database")
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///song_info.db'#+'?check_same_thread=False'
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
print("Database set up!")


class Song(db.Model):
    name = db.Column(db.String(50), nullable=False)
    album = db.Column(db.String(50), nullable=False)
    artist = db.Column(db.String(50), nullable=False)
    id = db.Column(db.String, primary_key=True)
    release_date = db.Column(db.Date)
    popularity = db.Column(db.Integer)
    length = db.Column(db.Integer)
    danceability = db.Column(db.Float)
    acousticness = db.Column(db.Float)
    energy = db.Column(db.Float)
    instrumentalness = db.Column(db.Float)
    liveness = db.Column(db.Float)
    valence = db.Column(db.Float)
    loudness = db.Column(db.Float)
    speechiness = db.Column(db.Float)
    tempo = db.Column(db.Float)
    key = db.Column(db.Integer)
    time_signature = db.Column(db.Integer)
    # gender = db.Column(db.String(20))
    # age = db.Column(db.Integer)
    # personality = db.Column(db.String(20))
    # mood_before = db.Column(db.String(20))
    emotion = db.Column(db.String(20), nullable=False)
    sad = db.Column(db.Integer, default=0)
    calm = db.Column(db.Integer, default=0)
    energetic = db.Column(db.Integer, default=0)
    happy = db.Column(db.Integer, default=0)
    genre = db.Column(db.String(100))
    metadata_arousal = db.Column(db.Float)
    metadata_valence = db.Column(db.Float)

    def __repr__(self):
        return '<Song %r>' % self.name

@app.route('/', methods=['POST', 'GET', 'OPTIONS'])
def index():
    return render_template('index.html')


@app.route('/form', methods=['POST'])
def form():
    song = request.get_json(force=True)
    print(song)

    emotions = ['calm', 'sad', 'happy', 'energetic']

    for emotion in emotions:
        for elementId, track in song[emotion].items():
            song_id = search_track(track['author'], track['title'])

            # case: song isn't in database, get features and add
            query_result = db.session.query(Song).filter_by(id=song_id).first()
            if query_result is None:
                details, columns = get_songs_features(song_id)
                if len(details[columns.index('release_date')]) < 10:
                    details[columns.index('release_date')] = details[columns.index('release_date')] + "-01-01"
                # genre = get_top_tag_last(details[columns.index('artist')], details[columns.index('name')])

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
                                 genre="genre")

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
                    query_result = new_track

            # case song is in database update emotion counter, always run after adding new song
            if emotion == 'calm':
                query_result.calm = query_result.calm + 1
            elif emotion == 'sad':
                query_result.sad = query_result.sad + 1
            elif emotion == 'energetic':
                query_result.energetic = query_result.energetic + 1
            else:
                query_result.happy = query_result.happy + 1
            try:
                db.session.commit()
            except Exception as err:
                db.session.rollback()
                print(err)
                print("Problem with updating emotion counter in database")
            else:
                print("Updated track!")

    return redirect(url_for('.index'))

print("Starting flask server!")
if __name__ == "__main__":
    app.run()
else:
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)