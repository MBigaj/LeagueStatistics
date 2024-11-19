from flask import Flask
from flask_cors import CORS
from champion_build_getter import ChampionBuildGetter

app = Flask(__name__)
CORS(app)

@app.route('/champion/<string:champion_name>')
def get_build_for_champion(champion_name: str):
    champion_build_getter = ChampionBuildGetter()
    return champion_build_getter.get_build_for_champion(champion_name)
