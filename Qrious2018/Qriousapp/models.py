from django.db import models
from django.contrib.auth.models import AbstractUser
from allauth.socialaccount.models import SocialAccount


class CustUser(AbstractUser):
   
   rank = models.IntegerField(blank=True, null=True)
   lev_num = models.IntegerField(default=1)
   num_diamonds = models.IntegerField(default=100)


   # emerald stuff
   is_emer_red = models.BooleanField(default=False)
   is_emer_blue = models.BooleanField(default=False)
   is_emer_green = models.BooleanField(default=False)
   is_emer_yellow = models.BooleanField(default=False)
   
   num_emers = models.IntegerField(default=0)
   # score = # formula

   def __str__(self):
      return str(self.username) #+ "-" # + str(self.score)


class Level(models.Model):
   lev_num = models.IntegerField(default=1)
   is_emer_red = models.BooleanField(default=False)
   is_emer_blue = models.BooleanField(default=False)
   is_emer_green = models.BooleanField(default=False)
   is_emer_yellow = models.BooleanField(default=False)
   
   def __str__(self):
      return str(self.lev_num)


class Problem(models.Model):
   level = models.ForeignKey(Level, on_delete=models.CASCADE)
   prob_num = models.IntegerField(blank=True, default=None)
   answer = models.CharField(max_length=1000)
   # problem_media_____ question, images, the like...
   prob_num_diam = models.IntegerField(default=50)
   prob_hint = models.CharField(max_length=1000)
   prob_help = models.CharField(max_length=1000)

   def __str__(self):
      return str(self.prob_num)
 


# formula = diamonds * 10 + emeralds * 100 + 1 * (total_levels - lev_num)

