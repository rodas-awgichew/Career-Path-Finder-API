from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.http import HttpResponse

def home_view(request):
    return HttpResponse("<h1>Welcome to Career Finder</h1><p>Try going to <a href='/api/auth/register/'>/api/auth/register/</a></p>")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('API.urls')),
    path('', home_view),
        re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='frontend'),
]
