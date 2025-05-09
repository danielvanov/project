from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import MatchViewSet

router = DefaultRouter()
router.register(r'matches', MatchViewSet, basename='match') 

urlpatterns = router.urls
