from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

from .models import Profile, Follower
from .serializers import ProfileSerializer, FollowerSerializer
from ..newsfeed.models import Post, Comment
from ..newsfeed.serializers import PostSerializer, CommentSerializer


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
    permission_classes = [AllowAny, ]

    @action(
        methods=["POST"],
        detail=True,
        serializer_class=CommentSerializer
    )
    def create_comment(self, request, pk):
        post = get_object_or_404(Post, pk=pk)

        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                user=self.request.user,
                post=post
            )
            return Response(status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=["GET"],
        detail=True
    )
    def comments(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        comments = Comment.objects.filter(post=post)
        serialized_data = CommentSerializer(comments, many=True).data
        return Response(serialized_data)