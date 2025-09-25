"""
URL configuration for habit_hero project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from habits import views
from rest_framework.routers import SimpleRouter
from rest_framework.authtoken import views as view2


router=SimpleRouter()
router.register('users',views.UserAPIView)
router.register('habits',views.HabitViewSet)
router.register('checkin',views.CheckinViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(router.urls)),
    path('streaks/<int:habit_id>',views.habit_streaks,name='habit_streaks'),
    path('success_rate/<int:habit_id>',views.habit_success_rate,name='habit_success_rate'),
    path('login/', view2.obtain_auth_token),
    path('logout/', views.LogoutAPIView.as_view())
]
