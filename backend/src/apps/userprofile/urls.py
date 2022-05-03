from django.urls import path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r"profile/post", views.PostViewSet, basename="posts")

urlpatterns = [
    path("profile/", views.index),
    path("profile/<int:pk>/", views.index),
    path("profile/followers/", views.get_followers),
]

urlpatterns += router.urls
