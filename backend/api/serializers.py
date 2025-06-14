from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    # author_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author", "author_name"]
        extra_kwargs = {"author": {"read_only": True}}