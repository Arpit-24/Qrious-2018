from django.contrib import admin
from .models import CustUser, Problem, Level

admin.site.register(CustUser)
admin.site.register(Level)
admin.site.register(Problem)