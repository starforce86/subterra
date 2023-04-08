from cities_light.management.commands import cities_light
from django_filters import FilterSet


class RegionFilter(FilterSet):
    class Meta:
        model = cities_light.Region
        fields = ("country",)


class SubRegionFilter(FilterSet):
    class Meta:
        model = cities_light.SubRegion
        fields = (
            "region",
            "country",
        )


class CityFilter(FilterSet):
    class Meta:
        model = cities_light.City
        fields = (
            "subregion",
            "region",
            "country",
        )
