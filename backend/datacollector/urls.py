from django.urls import path
from . import views

urlpatterns = [
    path("messages/", views.MessageView.as_view()),
    path("messages/<str:author>/", views.MessageDetailView.as_view()),
    path("messages/<start_time>/<end_time>/", views.MessageListView.as_view())
    # path('messages/(?P<start_time>\d{10})/(?P<end_time>\d{10})/', views.MessageListView.as_view())
]
