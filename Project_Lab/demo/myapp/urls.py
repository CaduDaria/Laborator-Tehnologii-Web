from django.urls import path
from . import views

urlpatterns = [
    path('', views.loadingscreen, name='loadingscreen'),
    path('login/', views.login, name='login'),
    path('home/', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('galerie/', views.galerie, name='galerie'),
    path('chatbot/', views.chatbot, name='chatbot'),
    path('universities/', views.universities, name='universities'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
]