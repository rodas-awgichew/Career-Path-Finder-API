from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from your_app.models import CareerPath


class CareerPathAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="admin",
            password="admin123"
        )
        self.client.login(username="admin", password="admin123")

        self.career = CareerPath.objects.create(
            title="Backend Developer",
            description="Build APIs and services",
            required_skills="Python, Django",
            category="Software"
        )

        self.list_url = reverse("careerpath-list")

    def test_list_career_paths_public(self):
        """
        Ensure anyone can view career paths.
        """
        self.client.logout()
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_career_path_authenticated(self):
        """
        Ensure authenticated users can create career paths.
        """
        data = {
            "title": "Data Scientist",
            "description": "Work with data",
            "required_skills": "Python, ML",
            "category": "Data"
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
