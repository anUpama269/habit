from django.contrib import admin
from habits.models import CustomUser,Habit,Checkin
admin.site.register(CustomUser)
admin.site.register(Habit)
admin.site.register(Checkin)

# Register your models here.
