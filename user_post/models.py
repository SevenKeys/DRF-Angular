from django.db import models
from authentication.models import Account
# Create your models here.

class Post(models.Model):
	owner = models.ForeignKey(Account)
	title = models.CharField(max_length=100)
	body = models.TextField(blank=True,null=True)
	created = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ('created',)

	def __unicode__(self):
		return self.title
