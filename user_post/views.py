from rest_framework import generics, permissions, viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from .serializers import PostSerializer
from .models import Post
from .permissions import IsOwnerOrReadOnly
# Create your views here.


class PostViewSet(viewsets.ModelViewSet):
	queryset = Post.objects.order_by('-created')
	serializer_class = PostSerializer
    # use dangerous methods author must be authenticated and authorized
	def get_permissions(self):
		if self.request.method in permissions.SAFE_METHODS:
			return (permissions.AllowAny(),)
		return (permissions.IsAuthenticated(), IsOwnerOrReadOnly())
	# instead of connecting a new post with it owner we connect post with request.user
	def perform_create(self, serializer):
		serializer.save(owner = self.request.user)
		# return (PostViewSet, self).perform_create(serializer)


# we use this viewset to choose posts of definite account
class AccountPostsViewSet(viewsets.ModelViewSet):
	queryset = Post.objects.select_related('owner').all()
	serializer_class = PostSerializer

	def list(self, request, account_id=None):
		# queryset is based on the owner username, account_username is passed by router
		queryset = self.queryset.filter(owner__id=account_id)
		# many=True so that serialize the list of objects
		serializer = self.serializer_class(queryset, many=True)
		return Response(serializer.data)