from django.db import models

class Team(models.Model):
    api_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)
    logo = models.URLField()

    def __str__(self):
        return self.name

class Match(models.Model):
    api_match_id = models.IntegerField(unique=True)
    home_team = models.ForeignKey(Team, related_name='home_matches', on_delete=models.CASCADE)
    away_team = models.ForeignKey(Team, related_name='away_matches', on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = models.CharField(max_length=20)
    score_home = models.IntegerField(null=True, blank=True)
    score_away = models.IntegerField(null=True, blank=True)
    league_name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.home_team.name} vs {self.away_team.name}"
