import requests
from bs4 import BeautifulSoup


BUILDS_WEBSITE_URL = 'https://op.gg/champions/'


class ChampionBuildGetter:
    def get_build_for_champion(self, champion_name: str):
        build_website = requests.get(f'{BUILDS_WEBSITE_URL}{champion_name}/build')

        build_website_soup = BeautifulSoup(build_website.content, 'html.parser')

        builds_containers = build_website_soup.find_all('table', class_='css-1dynl8q ee7g5b0')

        items = []

        for build_container in builds_containers:
            build_trs = build_container.find('tbody').find_all('tr')
            for build_tr in build_trs:
                items.append([{'name': item['alt'], 'src': item['src']} for item in build_tr.find_all('img')])

        return items