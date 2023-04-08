from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from dj_rest_auth import serializers as auth_serializers

from apps.users.models import User


class UserSerializer(serializers.ModelSerializer):
    registered_at = serializers.DateTimeField(format="%H:%M %d.%m.%Y", read_only=True)

    class Meta:
        model = User
        fields = ["email", "registered_at", "user_type"]


class UserWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password"]


class UserRegisterSerializerMixin(RegisterSerializer):
    def save(self, request):
        user = super().save(request)
        self.create_related(user)
        return user

    def create_related(self, user):
        raise NotImplementedError("Implement logic of creation!")


class TokenSerializer(auth_serializers.TokenSerializer):
    user_type = serializers.ChoiceField(
        source="user.user_type", choices=User.USER_TYPES
    )
    user_id = serializers.CharField(source="user.pk")
    email = serializers.CharField(source="user.email")

    class Meta(auth_serializers.TokenSerializer.Meta):
        fields = (
            "key",
            "user_type",
            "user_id",
            "email",
        )
