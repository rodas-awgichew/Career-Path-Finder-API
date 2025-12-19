from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from API.models import Profile, CareerPath, Recommendation


class RecommendationAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="reco_user",
            password="pass123"
        )
        self.client.login(username="reco_user", password="pass123")

        self.profile = Profile.objects.create(
            user=self.user,
            skills="Python, Django",
            education_level="Bachelor"
        )

        self.career = CareerPath.objects.create(
            title="Backend Developer",
            description="APIs",
            required_skills="Python, Django",
            category="Software"
        )

        self.url = reverse("generate-recommendations")

    def test_generate_recommendations(self):
        """
        Ensure recommendations are generated based on matching skills.
        """
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            Recommendation.objects.filter(user=self.user).exists()
        )
