import importlib.util

from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView
from django.urls import path
from django.contrib import admin

from django.conf.urls import include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from config.settings import DEBUG

urlpatterns = [
    path("admin/", admin.site.urls, name="admin"),
    path("api/auth/", include("dj_rest_auth.urls")),
    path(
        "api/auth/password/reset/confirm/<str:uidb64>/<str:token>",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path("api/", include("apps.api.urls")),
    path("api/location/", include("apps.location.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]

if DEBUG and importlib.util.find_spec("debug_toolbar"):
    urlpatterns += {
        path("__debug__/", include("debug_toolbar.urls")),
    }
