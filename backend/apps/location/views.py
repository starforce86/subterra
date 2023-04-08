from cities_light.management.commands import cities_light
from rest_framework.mixins import ListModelMixin
from rest_framework.viewsets import GenericViewSet
from django_filters import rest_framework as filters

from apps.location.filters import CityFilter, SubRegionFilter, RegionFilter
from apps.location.serializers import (
    CountrySerializer,
    SubRegionSerializer,
    RegionSerializer,
    CitySerializer,
)


class CountryViewSet(GenericViewSet, ListModelMixin):
    serializer_class = CountrySerializer
    queryset = cities_light.Country.objects.all()


class RegionViewSet(GenericViewSet, ListModelMixin):
    serializer_class = RegionSerializer
    queryset = cities_light.Region.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = RegionFilter


class SubRegionViewSet(GenericViewSet, ListModelMixin):
    serializer_class = SubRegionSerializer
    queryset = cities_light.SubRegion.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = SubRegionFilter


class CityViewSet(GenericViewSet, ListModelMixin):
    serializer_class = CitySerializer
    queryset = cities_light.City.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = CityFilter
