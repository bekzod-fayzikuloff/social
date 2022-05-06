from rest_framework import serializers
from .models import Post, Comment
from ..core.utils import CustomUserSerializerMixin


class CommentSerializer(serializers.ModelSerializer, CustomUserSerializerMixin):
    class Meta:
        model = Comment
        fields = ("content", )


class PostSerializer(serializers.ModelSerializer, CustomUserSerializerMixin):
    user = serializers.SerializerMethodField()
    # comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = "__all__"

    @staticmethod
    def get_comments(obj: Post):
        queryset = Comment.objects.filter(post=obj)
        return CommentSerializer(queryset, many=True).data
