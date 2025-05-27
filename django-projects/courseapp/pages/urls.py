from django.http import HttpResponse
from django.urls import path

from courseapp.courses import views

def home(request):
    return HttpResponse('anasayfa')
def hakkimizda(request):
    return HttpResponse('hakkımızda sayfası')

def iletisim(request): 
    return HttpResponse('iletişim sayfası')
urlpatterns = [
    path('', views.home),
    path('home', views.home),
    path('anasayfa', views.home),
    path('iletisim', views.iletisim),
    path('hakkimizda', views.hakkimizda),
  
]
