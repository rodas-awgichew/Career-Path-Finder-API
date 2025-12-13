from django.urls import path
from .views import (
    CareerPathListCreateView,
    CareerPathDetailView,
    ProfileDetailView,
    RecommendationListView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from .auth_views import RegisterView

urlpatterns = [

        path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('career-paths/', CareerPathListCreateView.as_view(), name='careerpath-list'),
    path('career-paths/<int:pk>/', CareerPathDetailView.as_view(), name='careerpath-detail'),

    path('profile/', ProfileDetailView.as_view(), name='profile-detail'),

    path('recommendations/', RecommendationListView.as_view(), name='recommendations-list'),
]
