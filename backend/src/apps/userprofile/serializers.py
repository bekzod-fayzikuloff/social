from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile, Follower
from ..newsfeed.serializers import PostSerializer
from ..newsfeed.models import Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


class ProfileSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = "__all__"

    @staticmethod
    def get_posts(obj: Profile):
        queryset = Post.objects.filter(user=obj.user)
        return PostSerializer(queryset, many=True).data

    @staticmethod
    def get_user(obj: Profile):
        return UserSerializer(obj.user).data


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = "__all__"
