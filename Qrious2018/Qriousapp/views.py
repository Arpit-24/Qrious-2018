from django.views import generic
from .models import CustUser, Problem, Level
from django.views.generic.edit import CreateView, UpdateView
from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth import authenticate, login     # verifies login
from django.views.generic import View
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core.urlresolvers import reverse_lazy
from django.contrib import auth
from django.contrib.auth.models import User

@login_required(redirect_field_name='if_auth')
def index(request):
   """if request.user.is_authenticated():"""
   return render(request, "Qriousapp/index.html")
   """else:
         return HttpResponseRedirect("accounts/login/")"""
# the decorator performs the same function as the code in the doc_string

"""
class LeaderboardView(generic.ListView):
   model = CustUser
   template_name = 'Qriousapp/leaderboard.html'
   context_object_name = 'all_users'
      
   def get_queryset(self):
      return CustUser.objects.all()

"""
@login_required(redirect_field_name='if_auth')
def leaderboard_view(request):
   data = []
   leaderboard = CustUser.objects.order_by('num_diamonds').reverse()
   for user in leaderboard:

      user_details = {}
      user_details["details"] = {"name": user.username,
                                 "diamonds": user.num_diamonds,
                                 "emeralds": user.num_emers}


      data.append(user_details)
 
   # data = [{"details":{"name": ,"diamonds": , "emeralds": }}, {}, {}]
   return JsonResponse(data, safe=False)


@login_required(redirect_field_name='if_auth')
def instructions_view(request):
   
   

   return render(request, "Qriousapp/instructions.html")


# frontend design login
def login_view(request):
   
   return render(request, "Qriousapp/login.html")
   
   
