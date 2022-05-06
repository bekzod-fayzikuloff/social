from rest_framework import serializers
from .models import Profile, Follower
from ..core.utils import CustomUserSerializerMixin
from ..newsfeed.serializers import PostSerializer
from ..newsfeed.models import Post


class ProfileSerializer(serializers.ModelSerializer, CustomUserSerializerMixin):
    posts = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = "__all__"

    @staticmethod
    def get_posts(obj: Profile):
        queryset = Post.objects.filter(user=obj.user)
        return PostSerializer(queryset, many=True).data


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = "__all__"
