from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home_view(request):
    return HttpResponse("<h1>Welcome to Career Finder</h1><p>Try going to <a href='/api/auth/register/'>/api/auth/register/</a></p>")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('API.urls')),
    path('', home_view),
]
