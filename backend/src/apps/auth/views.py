from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import SignInTokenSerializer


@api_view(["GET"])
def index(request):
    return Response("test")


class SignInView(TokenObtainPairView):
    serializer_class = SignInTokenSerializer
