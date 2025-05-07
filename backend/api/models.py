from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    # author_name = 'testing_name'
    # author_name = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, to_field='username')

    def __str__(self):
        return self.title
