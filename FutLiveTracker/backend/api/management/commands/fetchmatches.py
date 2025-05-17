from django.core.management.base import BaseCommand
import requests
from api.models import Match, Team
from django.utils.dateparse import parse_datetime

API_KEY = '90abbf9ee85cd2fbc38aaeac69c4de49'  
API_URL = "https://v3.football.api-sports.io/fixtures?live=all"

HEADERS = {
    "x-apisports-key": API_KEY,
    "Accept": "application/json"
}

class Command(BaseCommand):
    help = 'Fetches live matches and stores them in the database'

    def handle(self, *args, **kwargs):
        try:
            response = requests.get(API_URL, headers=HEADERS)
            data = response.json()

            for item in data["response"]:
                fixture = item["fixture"]
                home = item["teams"]["home"]
                away = item["teams"]["away"]
                goals = item["goals"]
                league = item.get("league", {})
                league_name = league.get("name", "Unknown League")  

                # Get or create teams
                home_team, _ = Team.objects.get_or_create(
                    api_id=home["id"],
                    defaults={"name": home["name"], "logo": home["logo"]}
                )

                away_team, _ = Team.objects.get_or_create(
                    api_id=away["id"],
                    defaults={"name": away["name"], "logo": away["logo"]}
                )

                # Create or update match
                Match.objects.update_or_create(
                    api_match_id=fixture["id"],
                    defaults={
                        "home_team": home_team,
                        "away_team": away_team,
                        "date": parse_datetime(fixture["date"]),
                        "status": fixture["status"]["short"],
                        "score_home": goals["home"],
                        "score_away": goals["away"],
                        "league_name": league_name, 
                    }
                )

            self.stdout.write(self.style.SUCCESS("✅ Matches updated successfully."))

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"❌ Error fetching matches: {e}"))
