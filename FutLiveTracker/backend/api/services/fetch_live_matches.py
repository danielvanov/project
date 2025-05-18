import requests
from django.utils.dateparse import parse_datetime
from api.models import Match, Team

API_URL = "https://v3.football.api-sports.io/fixtures"
API_KEY = "90abbf9ee85cd2fbc38aaeac69c4de49"  # Replace this with your actual API key

HEADERS = {
    "x-apisports-key": API_KEY
}

def fetch_live_matches():
    response = requests.get(API_URL, headers=HEADERS, params={"live": "all"})
    data = response.json()

    if data["response"]:
        Match.objects.all().delete()  # Clear old matches
        for item in data["response"]:
            fixture = item["fixture"]
            teams = item["teams"]
            goals = item["goals"]
            league = item["league"]

            # Create or get home and away teams
            home_team, _ = Team.objects.get_or_create(
                external_id=teams["home"]["id"],
                defaults={
                    "name": teams["home"]["name"],
                    "logo": teams["home"]["logo"]
                }
            )
            away_team, _ = Team.objects.get_or_create(
                external_id=teams["away"]["id"],
                defaults={
                    "name": teams["away"]["name"],
                    "logo": teams["away"]["logo"]
                }
            )

            # Update team names/logos if they already existed
            home_team.name = teams["home"]["name"]
            home_team.logo = teams["home"]["logo"]
            home_team.save()

            away_team.name = teams["away"]["name"]
            away_team.logo = teams["away"]["logo"]
            away_team.save()

            Match.objects.create(
                home_team=home_team,
                away_team=away_team,
                score_home=goals["home"] or 0,
                score_away=goals["away"] or 0,
                status=fixture["status"]["short"],
                date=parse_datetime(fixture["date"]),
                league_name=league["name"]  # ✅ This is the key fix
            )
