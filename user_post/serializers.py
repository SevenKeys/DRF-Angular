from rest_framework import serializers

from .models import Post
from authentication.serializers import AccountSerializer


class PostSerializer(serializers.ModelSerializer):
    # that's nested serialisation of owner
    owner = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Post
        fields = ('id','title','body','created','owner',)
        read_only_fields = ('id', 'created','updated')
    # owner must set automatically
    def get_validation_exclusion(self, *args, **kwargs):
        exclusions = super(PostSerializer, self).get_validation_exclusion(*args, **kwargs)
        return exclusions + ['owner']