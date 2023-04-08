from cities_light.management.commands import cities_light
from django_filters import FilterSet

from apps.api import models


class PropertyFilter(FilterSet):
    class Meta:
        model = models.Property
        fields = ("owner",)
