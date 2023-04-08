from rest_framework import routers

from apps.location.views import (
    CountryViewSet,
    RegionViewSet,
    SubRegionViewSet,
    CityViewSet,
)

router = routers.DefaultRouter()

router.register(r"country", CountryViewSet)
router.register(r"region", RegionViewSet)
router.register(r"subregion", SubRegionViewSet)
router.register(r"city", CityViewSet)

urlpatterns = router.urls
