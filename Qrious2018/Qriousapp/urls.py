from django.conf.urls import url
from . import views

app_name = "Qriousapp"
urlpatterns = [
   url(r'^$', views.index, name="index"),


   url(r'^login/$', views.login_view, name="login_view"),

   url(r'^logout/$', views.logout_view, name="logout_view"),

   url(r'^leaderboard/$', views.leaderboard_view, name="leaderboard_view"),

   url(r'^getlevel/$', views.get_level_view, name="get_level_view"),
   
   url(r'^gethint/$', views.get_hint_view, name="get_hint_view"),

   url(r'^getques/$', views.get_ques_view, name="get_ques_view"),

   url(r'^submit_answer/$', views.submit_answer_view, name="submit_answer_view"),

   url(r'^send_level/$', views.send_level_view, name="send_level_view"),

   url(r'^forfeit_question/$', views.forfeit_question_view, name="forfeit_question_view"),

   url(r'^emerald_ques_skip/$', views.emerald_ques_skip_view, name="emerald_ques_skip_view")

]

