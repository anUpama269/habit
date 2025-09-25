from django.db import models
from django.contrib.auth.models import AbstractUser



class CustomUser(AbstractUser):
   email = models.EmailField(unique=True)
   created_at=models.DateTimeField(auto_now_add=True)

class Habit(models.Model):
    FREQUENCY_CHOICES=[('daily','Daily'),('weekly','Weekly')]
    CATEGORY_CHOICES=[('health', 'Health'),('work','Work'),('learning','Learning'),('productivity','Productivity'),('mental_health','Mental Health')]
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name="habits")
    name=models.CharField(max_length=100)
    frequency=models.CharField(max_length=20,choices=FREQUENCY_CHOICES)
    category=models.CharField(max_length=20,choices=CATEGORY_CHOICES)
    start_date=models.DateField()

class Checkin(models.Model):
    habit=models.ForeignKey(Habit,on_delete=models.CASCADE, related_name="checkins")
    date=models.DateField()
    status=models.BooleanField(default=False)
    notes=models.TextField(blank=True,null=True)
# Create your models here.
