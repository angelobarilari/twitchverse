from django.urls import path
from . import views

urlpatterns = [
    path('messages/', views.MessageView.as_view())
]
