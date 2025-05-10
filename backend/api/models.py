from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    author_name = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):

        if self.author:
            self.author_name = self.author

        super().save(*args, **kwargs)
