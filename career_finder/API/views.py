from rest_framework import generics, permissions
from .models import Profile, CareerPath, Recommendation
from .serializers import ProfileSerializer, CareerPathSerializer, RecommendationSerializer
from django.contrib.auth.models import User

# --- Career Path view ---

class CareerPathListCreateView(generics.ListCreateAPIView):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer


class CareerPathDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer


# Profile (User Profile) view

class ProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        user = self.request.user
        return Profile.objects.get(user=user)

# Recommendations list view

class RecommendationListView(generics.ListAPIView):
    serializer_class = RecommendationSerializer

    def get_queryset(self):
        user = self.request.user
        return Recommendation.objects.filter(user=user)
