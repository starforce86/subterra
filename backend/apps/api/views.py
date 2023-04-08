import boto3
import requests
from allauth.account.adapter import get_adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.views import LoginView
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models import Q
from django.http import StreamingHttpResponse
from django.utils.encoding import smart_str
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from apps.api import models
from apps.api.email import NewInquiryEmailNotification
from apps.api.filters import PropertyFilter
from apps.api.models import Document, Picture
from apps.api.permissions import (
    IsOwner,
    IsOwnerOfProperty,
    IsOwnerRight,
    IsPropertyRight,
    IsMineralRight,
    IsHeirRightData,
    IsHeirRightPath,
    IsWillRightPath,
    IsServiceCompany,
    IsServiceCompanyRight,
)
from apps.api.serializers import (
    PropertySerializer,
    LandOwnerSerializer,
    LandOwnerRegisterSerializer,
    LandOwnerSocialRegisterSerializer,
    MineralSerializer,
    ServiceCompanySerializer,
    ServiceCompanyRegisterSerializer,
    ServiceCompanySocialRegisterSerializer,
    ServiceCompanyServiceSerializer,
    DocumentSerializer,
    MineralTypeSerializer,
    HeirSerializer,
    WillSerializer,
    InquirySerializer,
    InquiryServiceCompanySerializer,
    MessageSerializer,
    CertificationTypeSerializer,
    PictureSerializer,
)
from apps.core.views import BaseViewSet


class PropertyViewSet(BaseViewSet, ModelViewSet):
    permissions_map = {
        "default": (IsAuthenticated,),
        "update": (
            IsAuthenticated,
            IsOwner,
            IsOwnerOfProperty,
        ),
        "partial_update": (
            IsAuthenticated,
            IsOwner,
            IsOwnerOfProperty,
        ),
        "destroy": (
            IsAuthenticated,
            IsOwner,
            IsOwnerOfProperty,
        ),
    }

    serializer_class = PropertySerializer
    queryset = models.Property.objects.all()
    filter_class = PropertyFilter
    search_fields = (
        "state__name",
        "county__name",
        "owner__user__email",
        "owner__first_name",
        "owner__middle_name",
        "owner__last_name",
        "legal_description",
        "minerals__mineral_type__title",
        "documents__s3_url",
    )


class MineralViewSet(BaseViewSet, ModelViewSet):
    permissions_map = {
        "default": (IsAuthenticated,),
        "update": (
            IsAuthenticated,
            IsOwner,
            IsPropertyRight,
            IsMineralRight,
        ),
        "partial_update": (
            IsAuthenticated,
            IsOwner,
            IsPropertyRight,
            IsMineralRight,
        ),
        "destroy": (
            IsAuthenticated,
            IsOwner,
            IsPropertyRight,
            IsMineralRight,
        ),
    }

    serializer_class = MineralSerializer
    queryset = models.Mineral.objects.all()


class LandOwnerViewSet(
    BaseViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
):
    permissions_map = {
        "default": (IsAuthenticated,),
        "create": (AllowAny,),
        "update": (
            IsAuthenticated,
            IsOwner,
            IsOwnerRight,
        ),
        "partial_update": (
            IsAuthenticated,
            IsOwner,
            IsOwnerRight,
        ),
    }
    serializer_class = LandOwnerSerializer
    queryset = models.LandOwner.objects.all()

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = LandOwnerRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(self.request)
        serializer = LandOwnerSerializer(instance=user.owner)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ServiceCompanyViewSet(
    BaseViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
):
    permissions_map = {
        "default": (IsAuthenticated,),
        "create": (AllowAny,),
        "update": (
            IsAuthenticated,
            IsServiceCompany,
            IsServiceCompanyRight,
        ),
        "partial_update": (
            IsAuthenticated,
            IsServiceCompany,
            IsServiceCompanyRight,
        ),
    }
    serializer_class = ServiceCompanySerializer
    queryset = models.ServiceCompany.objects.all()

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = ServiceCompanyRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(self.request)
        serializer = ServiceCompanySerializer(instance=user.service_company)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

    def post(self, request, *args, **kwargs):
        settings.SOCIALACCOUNT_AUTO_SIGNUP = False
        try:
            res = super().post(request, args, kwargs)
        except Exception as ex:
            if "Reverse for 'socialaccount_signup' not found" in str(ex):
                return Response(
                    data={"message": "User is not registered yet"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        return res


class LandOwnerGoogleRegisterView(LoginView):
    adapter_class = GoogleOAuth2Adapter
    serializer_class = LandOwnerSocialRegisterSerializer

    def post(self, request, *args, **kwargs):
        settings.SOCIALACCOUNT_AUTO_SIGNUP = True
        res = super().post(request, args, kwargs)
        user = get_user_model().objects.filter(auth_token=res.data["key"])[0]
        serializer = LandOwnerSerializer(instance=user.owner)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def process_login(self):
        get_adapter(self.request).login(self.request, self.user)


class ServiceCompanyGoogleRegisterView(LoginView):
    adapter_class = GoogleOAuth2Adapter
    serializer_class = ServiceCompanySocialRegisterSerializer

    def post(self, request, *args, **kwargs):
        settings.SOCIALACCOUNT_AUTO_SIGNUP = True
        res = super().post(request, args, kwargs)
        user = get_user_model().objects.filter(auth_token=res.data["key"])[0]
        serializer = ServiceCompanySerializer(instance=user.owner)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def process_login(self):
        get_adapter(self.request).login(self.request, self.user)


class ServiceCompanyServiceViewSet(BaseViewSet, ListModelMixin):
    serializer_class = ServiceCompanyServiceSerializer
    queryset = models.ServiceCompanyService.objects.all()


class CertificationTypeViewSet(BaseViewSet, ListModelMixin):
    serializer_class = CertificationTypeSerializer
    queryset = models.CertificationType.objects.all()


class MineralTypeViewSet(BaseViewSet, ListModelMixin):
    serializer_class = MineralTypeSerializer
    queryset = models.MineralType.objects.all()


class HeirViewSet(BaseViewSet, ModelViewSet):
    permissions_map = {
        "default": (IsAuthenticated,),
        "create": (
            IsAuthenticated,
            IsOwner,
            IsPropertyRight,
        ),
        "update": (
            IsAuthenticated,
            IsOwner,
            IsPropertyRight,
            IsHeirRightPath,
        ),
        "partial_update": (
            IsAuthenticated,
            IsOwner,
            IsPropertyRight,
            IsHeirRightPath,
        ),
        "destroy": (
            IsAuthenticated,
            IsOwner,
            IsHeirRightPath,
        ),
    }
    serializer_class = HeirSerializer
    queryset = models.Heir.objects.all()


class WillViewSet(BaseViewSet, ModelViewSet):
    permissions_map = {
        "default": (IsAuthenticated,),
        "create": (
            IsAuthenticated,
            IsOwner,
            IsHeirRightData,
        ),
        "update": (
            IsAuthenticated,
            IsOwner,
            IsHeirRightData,
            IsWillRightPath,
        ),
        "partial_update": (
            IsAuthenticated,
            IsOwner,
            IsHeirRightData,
            IsWillRightPath,
        ),
        "destroy": (
            IsAuthenticated,
            IsOwner,
            IsWillRightPath,
        ),
    }
    serializer_class = WillSerializer
    queryset = models.Will.objects.all()


class InquiryViewSet(
    BaseViewSet, CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
):
    permissions_map = {
        "default": (IsAuthenticated,),
        "create": (
            IsAuthenticated,
            IsOwner,
        ),
        "update": (
            IsAuthenticated,
            IsOwner,
        ),
        "partial_update": (
            IsAuthenticated,
            IsOwner,
        ),
    }
    serializer_class = InquirySerializer
    queryset = models.Inquiry.objects.all()

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        NewInquiryEmailNotification(inquiry=instance).send()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class InquiryServiceCompanyViewSet(BaseViewSet, CreateModelMixin, UpdateModelMixin):
    permissions_map = {
        "default": (IsAuthenticated,),
        "create": (
            IsAuthenticated,
            IsOwner,
        ),
        "update": (
            IsAuthenticated,
            IsOwner,
        ),
        "partial_update": (
            IsAuthenticated,
            IsOwner,
        ),
    }
    serializer_class = InquiryServiceCompanySerializer
    queryset = models.InquiryServiceCompany.objects.all()


class DocumentViewSet(
    BaseViewSet, CreateModelMixin, ListModelMixin, RetrieveModelMixin
):
    serializer_class = DocumentSerializer
    queryset = Document.objects.filter(upload_finished_at__isnull=False)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        presigned_data = serializer.get_presigned_url(**serializer.validated_data)
        return Response(data=presigned_data)

    @action(methods=["GET"], detail=False)
    def download(self, request):
        bucket = request.query_params["s3_object_path"].split("/")[0]
        key = "/".join(request.query_params["s3_object_path"].split("/")[1:])
        file_name = request.query_params["s3_object_path"].split("/")[-1]
        presigned_url = boto3.client("s3").generate_presigned_url(
            ClientMethod="get_object",
            Params={"Bucket": bucket, "Key": key},
            ExpiresIn=3600,
        )
        r = requests.get(presigned_url, stream=True)
        resp = StreamingHttpResponse(streaming_content=r.raw)
        resp["Content-Disposition"] = "attachment; filename=%s" % smart_str(file_name)
        return resp


class PictureViewSet(BaseViewSet, CreateModelMixin, ListModelMixin, RetrieveModelMixin):
    serializer_class = PictureSerializer
    queryset = Picture.objects.filter(upload_finished_at__isnull=False)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        presigned_data = serializer.get_presigned_url(**serializer.validated_data)
        return Response(data=presigned_data)


class MessageViewSet(BaseViewSet, ModelViewSet):
    permissions_map = {
        "default": (IsAuthenticated,),
    }
    serializer_class = MessageSerializer
    queryset = models.Message.objects.all()

    def get_queryset(self):
        user = self.request.user
        return super().get_queryset().filter(Q(sender=user) | Q(recipient=user))
