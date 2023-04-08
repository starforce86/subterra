from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    def _create_user(
        self, email, password, is_staff, is_superuser, is_active, **extra_fields
    ):
        """
        Creates and saves a User with the given username, email and password.
        """
        user = self.model(
            email=self.normalize_email(email),
            is_active=is_active,
            is_staff=is_staff,
            is_superuser=is_superuser,
            last_login=timezone.now(),
            registered_at=timezone.now(),
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        is_staff = extra_fields.pop("is_staff", False)
        is_superuser = extra_fields.pop("is_superuser", False)
        return self._create_user(
            email, password, is_staff, is_superuser, False, **extra_fields
        )

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True, True, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_OWNER = "owner"
    USER_TYPE_SERVICE_COMPANY = "service_company"
    USER_TYPE_STAFF = "staff"

    USER_TYPES = (
        USER_TYPE_OWNER,
        USER_TYPE_SERVICE_COMPANY,
        USER_TYPE_STAFF,
    )

    email = models.EmailField(verbose_name="Email", unique=True, max_length=255)

    is_admin = models.BooleanField(verbose_name="Admin", default=False)
    is_active = models.BooleanField(verbose_name="Active", default=False)
    is_staff = models.BooleanField(verbose_name="Staff", default=False)
    registered_at = models.DateTimeField(
        verbose_name="Registered at", auto_now_add=timezone.now
    )

    # Fields settings
    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"

    objects = UserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    @property
    def is_owner(self):
        return hasattr(self, "owner")

    @property
    def is_service_company(self):
        return hasattr(self, "service_company")

    @property
    def user_type(self):
        if self.is_owner:
            return self.USER_TYPE_OWNER
        elif self.is_service_company:
            return self.USER_TYPE_SERVICE_COMPANY
        return self.USER_TYPE_STAFF
