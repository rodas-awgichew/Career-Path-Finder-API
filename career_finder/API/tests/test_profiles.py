from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from your_app.models import Profile


class ProfileAPITest(APITestCase):
    def setUp(self):
        # Create and authenticate a test user
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123"
        )
        self.client.login(username="testuser", password="testpass123")

        # Create profile manually if not auto-created
        self.profile = Profile.objects.create(
            user=self.user,
            skills="Python, Django",
            education_level="Bachelor"
        )

        self.url = reverse("profile-detail")

    def test_get_profile(self):
        """
        Ensure authenticated users can retrieve their profile.
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_profile(self):
        """
        Ensure authenticated users can update their profile.
        """
        response = self.client.patch(self.url, {"skills": "Python, Django, REST"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.profile.refresh_from_db()
        self.assertIn("REST", self.profile.skills)
