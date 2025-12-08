from django.urls import path
from .views import (
    CareerPathListCreateView,
    CareerPathDetailView,
    ProfileDetailView,
    RecommendationListView
)

urlpatterns = [
    path('career-paths/', CareerPathListCreateView.as_view(), name='careerpath-list'),
    path('career-paths/<int:pk>/', CareerPathDetailView.as_view(), name='careerpath-detail'),

    path('profile/', ProfileDetailView.as_view(), name='profile-detail'),

    path('recommendations/', RecommendationListView.as_view(), name='recommendations-list'),
]
