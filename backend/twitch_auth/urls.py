from django.urls import path
from . import views

urlpatterns = [
    path("twitch/authorize/", views.TwitchAuthorizationAPIView.as_view()),
    path("token/", views.TwitchTokenAPIView.as_view()),
]
