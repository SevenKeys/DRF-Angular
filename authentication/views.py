import json

from django.contrib.auth import authenticate, login, logout

from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response

from .models import Account
from .permissions import IsAccountOwner
from .serializers import AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
        	return (permissions.AllowAny(),)

        if self.request.method == 'POST':
        	return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
	def post(sel, request, format=None):
		data = json.loads(request.body)
		username = data.get('username', None)
		password = data.get('password', None)

		account = authenticate(username=username, password=password)
		if account is not None:
			if account.is_active:
				login(request, account)
				serializer = AccountSerializer(account)
				# user can get JSON data
				return Response(serializer.data)
			else:
				return Response({
					'text': 'Unauthorized',
					'message': 'Account is disabled'
					}, status=status.HTTP_401_UNAUTHORIZED)
		else:
			return Response({
				'text': 'Unauthorized',
				'message': 'You must enter username and password'
				}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
	# only authenticated users can log out
	permission_classes = (permissions.IsAuthenticated,)
	def post(self, request, format=None):
		logout(request)
		return Response({}, status=status.HTTP_204_NO_CONTENT)