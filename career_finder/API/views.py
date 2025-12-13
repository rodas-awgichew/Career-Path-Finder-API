from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from .models import Profile, CareerPath, Recommendation
from .serializers import (
    ProfileSerializer,
    CareerPathSerializer,
    RecommendationSerializer
)

# --- Career Path Views ---

class CareerPathListCreateView(generics.ListCreateAPIView):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer

    # Anyone can view career paths, only authenticated users can create
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [permissions.AllowAny()]


class CareerPathDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer

    # Anyone can view, only authenticated users can update/delete
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAuthenticated()]
        return [permissions.AllowAny()]

# --- Profile (User Profile) View ---

class ProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user=self.request.user)

# --- Recommendations List View ---

class RecommendationListView(generics.ListAPIView):
    serializer_class = RecommendationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Recommendation.objects.filter(user=self.request.user)
