from rest_framework import serializers
from habits.models import CustomUser,Habit,Checkin

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs={'password':{'write_only':True}}
    def create(self,validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user



class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model=Habit
        fields='__all__'
        read_only_fields = ['user']


class CheckinSerializer(serializers.ModelSerializer):
    class Meta:
        model=Checkin
        fields='__all__'