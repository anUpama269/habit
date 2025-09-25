#views
from django.shortcuts import render
from rest_framework import viewsets
from habits.models import CustomUser,Habit,Checkin
from habits.serializers import UserSerializer,HabitSerializer,CheckinSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view

class UserAPIView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self,request):
        self.request.user.auth_token.delete()
        return Response({"msg":"logout successfully"},status=status.HTTP_200_OK)


class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer
    permission_classes = [IsAuthenticated,]
    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CheckinViewSet(viewsets.ModelViewSet):
    queryset = Checkin.objects.all()
    serializer_class = CheckinSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Checkin.objects.filter(habit__user=self.request.user)
        habit_id = self.request.query_params.get('habit')
        if habit_id:
            queryset = queryset.filter(habit_id=habit_id)
        return queryset

def calculate_streak(habit, user):
    checkins = Checkin.objects.filter(habit=habit, habit__user=user, status=True).order_by("date")
    streak, max_streak = 0, 0
    prev_date = None
    for c in checkins:
        if prev_date and (c.date - prev_date).days == 1:
            streak += 1
        else:
            streak = 1
        max_streak = max(max_streak, streak)
        prev_date = c.date
    return max_streak


def calculate_success_rate(habit, user):
    checkins = Checkin.objects.filter(habit=habit, habit__user=user)
    if not checkins.exists():
        return 0
    done = checkins.filter(status=True).count()
    return round((done / checkins.count()) * 100, 2)


@api_view(['GET'])
def habit_streaks(request, habit_id):
    try:
        habit = Habit.objects.get(id=habit_id, user=request.user)
    except Habit.DoesNotExist:
        return Response({"error": "Habit not found"}, status=status.HTTP_404_NOT_FOUND)

    max_streak = calculate_streak(habit, request.user)
    return Response({"habit_id": habit_id, "max_streak": max_streak})

@api_view(['GET'])
def habit_success_rate(request, habit_id):
    try:
        habit = Habit.objects.get(id=habit_id, user=request.user)
    except Habit.DoesNotExist:
        return Response({"error": "Habit not found"}, status=status.HTTP_404_NOT_FOUND)

    rate = calculate_success_rate(habit, request.user)
    return Response({"habit_id": habit_id, "success_rate": rate})



# Create your views here.

