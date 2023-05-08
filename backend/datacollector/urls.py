from django.urls import path
from . import views

urlpatterns = [
    path("messages/", views.MessageView.as_view()),
    path("messages/<str:author>/", views.MessageDetailView.as_view()),
]
