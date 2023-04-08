from django.urls import path, include
from rest_framework import routers

from apps.api.views import (
    PropertyViewSet,
    LandOwnerViewSet,
    LandOwnerGoogleRegisterView,
    GoogleLogin,
    MineralViewSet,
    ServiceCompanyViewSet,
    ServiceCompanyServiceViewSet,
    CertificationTypeViewSet,
    DocumentViewSet,
    MineralTypeViewSet,
    HeirViewSet,
    WillViewSet,
    InquiryViewSet,
    InquiryServiceCompanyViewSet,
    MessageViewSet,
    PictureViewSet,
)
from apps.api.webhook_views import webhook_handler

api = routers.DefaultRouter()
api.trailing_slash = "/?"

api.register(r"owner", LandOwnerViewSet)
api.register(r"service_company", ServiceCompanyViewSet)
api.register(r"property", PropertyViewSet)
api.register(r"mineral", MineralViewSet)
api.register(r"service", ServiceCompanyServiceViewSet)
api.register(r"certification_type", CertificationTypeViewSet)
api.register(r"mineral_type", MineralTypeViewSet)
api.register(r"heir", HeirViewSet)
api.register(r"will", WillViewSet)
api.register(r"inquiry", InquiryViewSet)
api.register(r"inquiry_servicecompany", InquiryServiceCompanyViewSet)
api.register(r"document", DocumentViewSet)
api.register(r"picture", PictureViewSet)
api.register(r"message", MessageViewSet)

urlpatterns = api.urls

urlpatterns += [
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
    path(
        "owner/google/",
        LandOwnerGoogleRegisterView.as_view(),
        name="landowner_google_register",
    ),
    path("aws_webhook/", webhook_handler),
]
