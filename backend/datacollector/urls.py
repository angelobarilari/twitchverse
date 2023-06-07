from django.urls import path
from . import views

urlpatterns = [
    path("messages/", views.MessageView.as_view()),
    path(
        "messages/author/<str:author>/",
        views.MessageFilterByAuthorView.as_view(),
    ),
    path("messages/word/<str:word>/", views.MessageFilterByWordView.as_view()),
    path(
        "messages/<start_time>/<end_time>/",
        views.MessageListByDateView.as_view(),
    ),
    path('twitch/authorize/', views.TwitchAuthorizationAPIView.as_view()),
    path('dashboard/', views.TwitchTokenAPIView.as_view()),
]
