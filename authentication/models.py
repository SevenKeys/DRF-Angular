from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class AccountManager(BaseUserManager):
	def create_user(self, email, password=None, **kwargs):
		if not kwargs.get('username'):
			raise ValueError('You should use a valid username')

		if not email:
			raise ValueError('You shouls use a valid email')

		account = self.model(username=kwargs.get('username'), 
							 email=self.normalize_email(email))
		account.set_password(password)
		account.save()
		return account

	def create_superuser(self, email, password, **kwargs):
		account = self.create_user(email, password, **kwargs)
		account.is_admin = True
		account.save()
		return account


class Account(AbstractBaseUser):
	username = models.CharField(max_length=25, unique=True)
	email= models.EmailField(unique=True)

	first_name = models.CharField(max_length=25, blank=True)
	last_name = models.CharField(max_length=25, blank=True)
	tagline = models.CharField(max_length=100, blank=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	is_admin = models.BooleanField(default=False)

	objects = AccountManager()

	USERNAME_FIELD = 'username'# unique identifier
	REQUIRED_FIELDS = ['email']

	def __unicode__(self):
		return self.username

	def get_full_name(self):
		return ' '.join([self.first_name, self.last_name])