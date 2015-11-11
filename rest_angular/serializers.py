from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
	model = User
	fields = ('username', 'firstname', 'lastname', 'email',)
	write_only_fields = ('password',)
	read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'data_joined',)

	def restore_object(self, attrs, instance=None):
		# this method calls set_password, if not password
		# would be written as palin text
		user = super(self, UserSerializer).restore_object(attrs,instance)
		user.set_password['password']
		return user