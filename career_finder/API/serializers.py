from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, CareerPath, Recommendation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = ['id', 'user', 'interests', 'skills', 'education_level', 'updated_at']

class CareerPathSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerPath
        fields = '__all__'

class RecommendationSerializer(serializers.ModelSerializer):
    # Use nested serializers for detailed info
    career_path_detail = CareerPathSerializer(source='career_path', read_only=True)
    
    class Meta:
        model = Recommendation
        fields = ['id', 'career_path', 'career_path_detail', 'match_score', 'created_at']