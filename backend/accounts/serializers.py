from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=6,
        error_messages={"min_length": "Password must be at least 6 characters"}
    )

    class Meta:
        model  = User
        fields = ['id', 'email', 'name', 'password']

    def create(self, validated_data):
        # use create_user so password gets hashed automatically
        user = User.objects.create_user(
            email    = validated_data['email'],
            password = validated_data['password'],
            name     = validated_data['name'],
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ['id', 'email', 'name', 'analyses_count', 'date_joined']
        read_only_fields = ['id', 'analyses_count', 'date_joined']