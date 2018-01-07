from django.conf.urls import url
from . import views

app_name = "Qriousapp"
urlpatterns = [
   url(r'^$', views.index, name="index"),
   url(r'^leaderboard$', views.LeaderboardView.as_view(), name="leaderboard_view"),
   url(r'^instructions$', views.instructions_view, name="instructions_view"),
   
]

