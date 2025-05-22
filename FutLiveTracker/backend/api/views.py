from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import Match
from .serializers import MatchSerializer
from django.db.models.functions import TruncDate
from django.utils.dateparse import parse_date

class MatchViewSet(ReadOnlyModelViewSet):
    queryset = Match.objects.all().order_by('date')  # ✅ REQUIRED
    serializer_class = MatchSerializer

    def get_queryset(self):
        queryset = self.queryset  # safe reference

        date_param = self.request.query_params.get('date')
        if date_param:
            parsed_date = parse_date(date_param)
            if parsed_date:
                print("📅 Filtering matches for:", parsed_date)
                queryset = queryset.annotate(date_only=TruncDate('date')).filter(date_only=parsed_date)

        return queryset
