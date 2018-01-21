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
import json

@login_required(redirect_field_name='if_auth')
def index(request):
   """if request.user.is_authenticated():"""
   return render(request, "Qriousapp/index.html")
   """else:
         return HttpResponseRedirect("accounts/login/")"""
# the decorator performs the same function as the code in the doc_string


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



"""@login_required(redirect_field_name='if_auth')
def get_problem(request):
   # data = [{"question":{"jumble":"","ques":""}}]

   data = []
   level = """


@login_required(redirect_field_name='if_auth')
def get_level_view(request):
   # data = [{"level": ,"forfeited":[0,1],"successful":[2],"openQues":3}] 
   
   data = []
   data_dict = {}
   usr = request.user
   data_dict["level"] = usr.lev_num
   data_dict["forfeited"] = usr.forfeited_ques_list
   data_dict["successful"] = usr.success_ques_list
   data_dict["openQues"] = usr.current_ques

   data.append(data_dict)


   return JsonResponse(data, safe=False)

@login_required(redirect_field_name='if_auth')
def get_hint_view(request):
   data = []
   data_dict = {}

   list_ = 0

          
   backend = json.loads(request.body)
   
   # list_ = backend.getlist(backend)

   usr = request.user
   """backend = {
             "level": level,
             "difficulty": difficulty
           }"""

   ques = list(Problem.objects.filter(level=1, prob_diff=0).values())

   # [{"hint":"This is ..","success":0}]
   
   # data_dict["hint"] = ques[0]["prob_hint"]
   data_dict["success"] = 1

   data.append(data_dict)
   """try:
               data.append(data_dict)
               return JsonResponse(data, safe=False)
         
            except Exception:
               return JsonResponse("you")"""

   """def insert_tc(request):
    if request.method == 'POST':       
    ret = request.POST
    type = ret['type']
    list = ret.getlist(ret)"""

   return JsonResponse(backend, safe=False)









