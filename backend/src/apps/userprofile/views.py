from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Profile, Follower
from .serializers import ProfileSerializer, FollowerSerializer
from ..newsfeed.models import Post
from ..newsfeed.serializers import PostSerializer


@api_view()
def index(request, pk=None):
    if pk:
        queryset = get_object_or_404(Profile, user_id=pk)
        serializer = ProfileSerializer(queryset).data
        return Response(serializer)

    queryset = Profile.objects.get(user=request.user)
    serializer = ProfileSerializer(queryset).data
    return Response(serializer)


@api_view()
def get_followers(request):
    queryset = Follower.objects.filter(to_user=request.user)
    serializer = FollowerSerializer(queryset, many=True).data

    return Response(serializer)


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
