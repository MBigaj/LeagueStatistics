import requests
from bs4 import BeautifulSoup

CHAMPION_IMAGE_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'
IMAGE_URL_POSTFIX = '_0.jpg'

CHAMPION_NAMES_WEBSITE_URL = 'https://www.leagueoflegends.com/en-us/champions/'
CHAMPION_NAMES_DIR = 'champion_names.txt'

CHAMPION_QUERY_DIR = 'champion_query.txt'

def main():
    generate_champion_names_txt(True)

    with open(CHAMPION_NAMES_DIR, 'r') as file:
        league_champions_list = file.read().split('\n')

    with open(CHAMPION_QUERY_DIR, 'w') as file:
        for league_champion in league_champions_list:
            file.write(f"({league_champion}), ")


def generate_champion_names_txt(shouldGenerate = False):
    if not shouldGenerate:
        return

    league_website = requests.get(CHAMPION_NAMES_WEBSITE_URL)
    league_website_soup = BeautifulSoup(league_website.content, 'html.parser')

    champion_name_divs = league_website_soup.find_all('div', {'data-testid': 'card-title'})
    
    champion_names = [champion_name_div.get_text() for champion_name_div in champion_name_divs]

    with open(CHAMPION_NAMES_DIR, 'w') as file:
        for champion_name in champion_names:
            image_url = CHAMPION_IMAGE_BASE_URL + champion_name + IMAGE_URL_POSTFIX
            file.write(f"'{champion_name}', '{image_url}'\n")


if __name__ == "__main__":
    main()
