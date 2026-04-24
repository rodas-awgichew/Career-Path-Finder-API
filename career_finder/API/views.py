from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
import logging

from .models import Profile, CareerPath, Recommendation
from .serializers import ProfileSerializer, CareerPathSerializer, RecommendationSerializer
from .utils import calculate_match_score

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

logger = logging.getLogger(__name__)

# --- Career Path Views ---
class CareerPathListCreateView(generics.ListCreateAPIView):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'description', 'required_skills']

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [permissions.AllowAny()]

class CareerPathDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAuthenticated()]
        return [permissions.AllowAny()]

# --- Profile View ---
class ProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user=self.request.user)

# --- Recommendations Views ---
class RecommendationListView(generics.ListAPIView):
    serializer_class = RecommendationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Recommendation.objects.filter(
            user=self.request.user
        ).select_related('career_path')

class GenerateRecommendationsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)

        Recommendation.objects.filter(user=user).delete()

        created = []
        for career in CareerPath.objects.all():
            score = calculate_match_score(profile.skills, career.required_skills)
            logger.debug(f"User skills: {profile.skills}, Career skills: {career.required_skills}, Score: {score}")
            created.append(
                Recommendation.objects.create(
                    user=user,
                    career_path=career,
                    match_score=score
                )
            )

        serializer = RecommendationSerializer(created, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
