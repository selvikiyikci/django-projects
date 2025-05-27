# courses/views.py
from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return HttpResponse('anasayfa')



def hakkimizda(request):
    return HttpResponse('hakkımızda sayfası')

def iletisim(request): 
    return HttpResponse('iletişim sayfası')
def kurslar(request):
    return HttpResponse('kurs listesi')