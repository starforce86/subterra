from cities_light.management.commands import cities_light
from rest_framework.serializers import ModelSerializer


class CountrySerializer(ModelSerializer):
    class Meta:
        model = cities_light.Country
        fields = ["id", "name", "code2", "phone"]


class RegionSerializer(ModelSerializer):
    class Meta:
        model = cities_light.Region
        fields = ["id", "name"]


class SubRegionSerializer(ModelSerializer):
    class Meta:
        model = cities_light.SubRegion
        fields = ["id", "name"]


class CitySerializer(ModelSerializer):
    class Meta:
        model = cities_light.City
        fields = ["id", "name"]
