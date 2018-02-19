from __future__ import unicode_literals # for using the json.loads(. . decode())
from django.views import generic
from .models import CustUser, Problem, Level
from django.views.generic.edit import CreateView, UpdateView
from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth import authenticate, login     # verifies login
from django.views.generic import View
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
import json


# shows the points based on the difficulty level of each question.
points_dict = {"0": 150, "1": 200, "2": 250}
hint_displayed = False


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



# frontend design login
def login_view(request):
   
   return render(request, "Qriousapp/login.html")



@login_required(redirect_field_name='if_auth')
def get_level_view(request):
   # data = [{"level": ,"forfeited":[0,1],"successful":[2],"openQues":3}] 
   
   data = []
   data_dict = {}

   usr = request.user


   data_dict["level"] = usr.lev_num
   data_dict["forfeited"] = list(usr.forfeited_ques_list)

   data_dict["successful"] = list(usr.success_ques_list)
   data_dict["openQues"] = usr.current_ques

   data.append(data_dict)
   



   return JsonResponse(data, safe=False)


@login_required(redirect_field_name='if_auth')
def get_hint_view(request):
   data = []
   data_dict = {}

   global points_dict, hint_displayed

   usr = request.user

   
   data_get = json.loads(request.body.decode('utf-8'))
   
   
   """backend = {
             "level": level,
             "difficulty": difficulty  -- recieve format
           }"""
   #user = request.user
   
   # user.save()
   ques = Problem.objects.get(level=data_get['level'], prob_diff=data_get['difficulty'])

   # [{"hint":"This is ..","success":0}] -- send format
   data_dict["hint"] = ques.prob_hint
   data_dict["success"] = 0
   

   if usr.num_diamonds >= 2 / 5 * points_dict[str(ques.prob_diff)] and hint_displayed == False: 

      usr.num_diamonds -= 2 / 5 * points_dict[str(ques.prob_diff)]
      hint_displayed = True
      data_dict["success"] = 1
      usr.save()

   data.append(data_dict)
  
   return HttpResponse(json.dumps(data))


@login_required(redirect_field_name='if_auth')
def get_ques_view(request):
   data = []
   data_dict = {}
           
   """var backend = {
             "level": level,
             "difficulty": difficulty,
             "csrfmiddlewaretoken": csrf_token,
           };
   """
   
   data_get = json.loads(request.body.decode('utf-8')) 
   
   # [{"question":{"jumble":"HelloAJAX","ques":"This is .."}}] --send format
   
   ques = Problem.objects.get(level=data_get['level'], prob_diff=data_get['difficulty'])

   data_dict["question"] = {"jumble": "HelloAJAX", "ques": ques.prob_ques}
   
   data.append(data_dict)

   return HttpResponse(json.dumps(data))


@login_required(redirect_field_name='if_auth')
def submit_answer_view(request):

   global points_dict
   usr = request.user
   

   data = []
   data_dict = {"success": 0}
           
   # recieve format
   """var backend = {
             "answer": answer,
             "level": level,
             "difficulty": difficulty,
             "csrfmiddlewaretoken": csrf_token,
           };
   """
   
   # [{"success":1,"points":150,"tot_points":1500}] -- send format


   data_get = json.loads(request.body.decode('utf-8'))
   

   ques = Problem.objects.get(level=data_get['level'], prob_diff=data_get['difficulty'])

   

   if data_get['answer'] == ques.answer:
      data_dict['success'] = 1

      data_dict['points'] = points_dict[str(ques.prob_diff)]
      usr.num_diamonds += points_dict[str(ques.prob_diff)]
      usr.lev_num += 1

      usr.save()

      data_dict['tot_points'] = usr.num_diamonds

   
   data.append(data_dict)

   return HttpResponse(json.dumps(data))



@login_required(redirect_field_name='if_auth')
def send_level_view(request):

   data_get = json.loads(request.body.decode('utf-8'))

   """var backend = {                       --recieve format
                "level": level,
                };
            """ 
   
   usr = request.user

   usr.lev_num = data_get["level"]

   usr.save()

   # gives error if nothing is returned
   return HttpResponse("") 


@login_required(redirect_field_name='if_auth')
def forfeit_question_view(request):
   """var backend = {
             "level": level,
             "difficulty": difficulty
           };"""


   usr = request.user
   data_get = json.loads(request.body.decode('utf-8'))

   usr.forfeited_ques_list = usr.forfeited_ques_list[:-1] + "," + str(data_get['difficulty']) + "]"
   usr.save()

   return HttpResponse("")



@login_required(redirect_field_name='if_auth')
def emerald_ques_skip_view(request):

   data = []

   data_dict = {"hint": "", "success": 0}

   """var backend = {
             "level": level, -- recieve format
             "difficulty": difficulty
           };"""

   # [{"hint":"This is a ..","success":0}] -- send format

   data_get = json.loads(request.body.decode('utf-8'))

   usr = request.user

   if usr.num_emers == 4:

      ques = Problem.objects.get(level=data_get['level'], prob_diff=data_get['difficulty'])

      data_get['hint'] = ques.prob_hint
      data_dict['success'] = 1;


   data.append(data_dict)

   return HttpResponse(json.dumps(data))


@login_required(redirect_field_name='if_auth')
def logout_view(request):
   logout(request)

   return HttpResponseRedirect('/login/')