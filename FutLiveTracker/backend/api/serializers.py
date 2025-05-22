from rest_framework import serializers
from .models import Team, Match

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'logo']

class MatchSerializer(serializers.ModelSerializer):
    home_team = TeamSerializer()
    away_team = TeamSerializer()

    class Meta:
        model = Match
        fields = [
            'id', 'home_team', 'away_team',
            'score_home', 'score_away',
            'status', 'date', 'league_name'
        ]
