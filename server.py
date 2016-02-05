from flask import Flask, render_template, request
from anilist.client import AniListClient
from json import dumps
import datetime


client = AniListClient()
app = Flask(__name__, static_folder='assets')

def get_season():
    month = datetime.datetime.now().month
    if month < 4:
        return "winter"
    if month < 7:
        return "spring"
    if month < 10:
        return "summer"
    return "fall"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/airing')
def get_airing():
    status, res = client.browse({
        "status": "Currently Airing",
        "full_page": "true",
        "airing_data": "true",
        "season": get_season()
    })
    if status == 200:
        return dumps(res)
    return None

from nyaaclient import NyaaClient
nyaac = NyaaClient()
@app.route('/anime/<id>')
def anime(id):
    res, anime = client.anime_page({ "id": id })
    if res != 200:
        return dumps([])
    return dumps(anime)

@app.route('/anime/<id>/torrents')
def torrents(id):
    res, anime = client.anime_page({ "id": id })
    if res != 200:
        return dumps([])
    title = anime['title_romaji']
    try:
        torrents = [nf.__dict__ for nf in nyaac.search(title)]
        for i, r in enumerate(torrents):
            torrents[i]['published'] = torrents[i]['published'].isoformat()
        torrent_sort = lambda t: (t.get('group', ''), t.get('episode', 0), t.get('quality', 0))
        torrents = sorted(torrents, key=torrent_sort)
    except:
        torrents = []
    return dumps(torrents)

if __name__ == '__main__':
    app.debug = True
    app.run(port=8080)
