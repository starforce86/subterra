from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import GenericViewSet

from apps.core.mixins import ActionPermissionsMixin


class BaseViewSet(ActionPermissionsMixin, GenericViewSet):
    filter_backends = (DjangoFilterBackend, SearchFilter)
