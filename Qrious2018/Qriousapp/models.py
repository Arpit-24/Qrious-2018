from django.db import models
from django.contrib.auth.models import AbstractUser
from allauth.socialaccount.models import SocialAccount


class CustUser(AbstractUser):
   
   rank = models.IntegerField(blank=True, null=True)
   lev_num = models.IntegerField(default=1)
   num_diamonds = models.IntegerField(default=100)
   success_ques_list = models.CharField(max_length=100, default=[0])
   forfeited_ques_list = models.CharField(max_length=100, default=[0])
   current_ques = models.IntegerField(default = -1)

   num_emers = models.IntegerField(default=0)
   # score = # formula

   def __str__(self):
      return str(self.username) + "-" + str(self.num_diamonds)


class Level(models.Model):
   lev_num = models.IntegerField(default=1)
   is_emerald = models.BooleanField(default=False)
  
   
   def __str__(self):
      return str(self.lev_num)


class Problem(models.Model):
   level = models.ForeignKey(Level, on_delete=models.CASCADE)
   answer = models.CharField(max_length=1000)
   prob_num_diam = models.IntegerField(default=50)
   prob_hint = models.CharField(max_length=1000, null=True)
   prob_help = models.CharField(max_length=1000, null=True)
   prob_diff = models.IntegerField(default=0)
   # prob_data_locate = models.FilePathField(path=none, recursive=False, null=True) # address
   prob_ques = models.CharField(max_length=1000, null=True) 
   prob_is_pass = models.IntegerField(default=0)
   prob_is_forfeit = models.IntegerField(default=0)
   


   def __str__(self):
      return str(self.prob_ques)
 


# formula = diamonds * 10 + emeralds * 100 + 1 * (total_levels - lev_num)

