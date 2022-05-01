from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import SignInTokenSerializer, RegisterSerializer


class SignInView(TokenObtainPairView):
    serializer_class = SignInTokenSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer
