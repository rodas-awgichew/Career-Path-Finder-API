from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from .models import Profile, CareerPath, Recommendation
from .serializers import (
    ProfileSerializer,
    CareerPathSerializer,
    RecommendationSerializer
)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import calculate_match_score

from django.http import Http404
import logging
from rest_framework import status
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend  # added for filtering
from rest_framework.filters import SearchFilter  # added for search functionality


logger = logging.getLogger(__name__)


# --- Career Path Views ---

class CareerPathListCreateView(generics.ListCreateAPIView):
    """
    Lists all career paths and allows authenticated users to create new ones.
    """
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]  # added filtering/search support
    filterset_fields = ['category']  # allows filtering by category
    search_fields = ['title', 'description', 'required_skills']  # enables keyword search

    def get_permissions(self):
        # Only authenticated users can create career paths
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
    """
    Allows an authenticated user to view and update their profile.
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            return Profile.objects.get(user=self.request.user)
        except Profile.DoesNotExist:
            logger.error(f"Profile not found for user {self.request.user.username}")
            raise Http404("Profile does not exist")  # improved explicit error handling


# --- Recommendations List View ---

class RecommendationListView(generics.ListAPIView):
    serializer_class = RecommendationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        logger.info(f"Fetching recommendations for user {self.request.user.username}")
        return Recommendation.objects.filter(user=self.request.user)


class GenerateRecommendationsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            logger.error(f"Recommendation failed: profile missing for {user.username}")
            return Response(
                {"error": "User profile not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        Recommendation.objects.filter(user=user).delete()

        career_paths = CareerPath.objects.all()
        created = []

        for career in career_paths:
            score = calculate_match_score(profile.skills, career.required_skills)
            if score > 0:
                created.append(
                    Recommendation.objects.create(
                        user=user,
                        career_path=career,
                        match_score=score
                    )
                )

        logger.info(f"{len(created)} recommendations generated for {user.username}")

        serializer = RecommendationSerializer(created, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
