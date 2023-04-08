from datetime import datetime

from dj_rest_auth.registration.serializers import SocialLoginSerializer
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer

from apps.api import models, utils
from apps.api.models import Document, Picture
from apps.location.serializers import (
    CitySerializer,
    RegionSerializer,
    CountrySerializer,
    SubRegionSerializer,
)
from apps.users.models import User
from apps.users.serializers import UserRegisterSerializerMixin, UserSerializer
from config import settings


class BaseSerializer(ModelSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get("request")
        self.user: User = request.user if request else None


class MineralTypeSerializer(BaseSerializer):
    class Meta:
        model = models.MineralType
        read_only_fields = ["id"]
        fields = ["title"] + read_only_fields


class ServiceCompanyServiceSerializer(BaseSerializer):
    class Meta:
        model = models.ServiceCompanyService
        read_only_fields = ["id"]
        fields = ["service"] + read_only_fields


class CertificationTypeSerializer(BaseSerializer):
    class Meta:
        model = models.CertificationType
        read_only_fields = ["id"]
        fields = ["title"] + read_only_fields


class ServiceCompanyCertificationRelationSerializer(BaseSerializer):
    certification_type_data = CertificationTypeSerializer(
        source="certification_type", read_only=True
    )

    class Meta:
        model = models.ServiceCompanyCertificationRelation
        read_only_fields = []
        fields = [
            "certification_type",
            "certification_type_data",
            "certification_number",
        ] + read_only_fields


class ServiceCompanyContactSerializer(BaseSerializer):
    class Meta:
        model = models.ServiceCompanyContact
        read_only_fields = []
        fields = ["first_name", "last_name"] + read_only_fields


class ServiceCompanyPreferredStateSerializer(BaseSerializer):
    class Meta:
        model = models.ServiceCompanyPreferredState
        read_only_fields = []
        fields = ["state"] + read_only_fields


class ServiceCompanyPhoneSerializer(BaseSerializer):
    class Meta:
        model = models.ServiceCompanyPhone
        read_only_fields = []
        fields = ["phone"] + read_only_fields


class ServiceCompanySocialLinkSerializer(BaseSerializer):
    class Meta:
        model = models.ServiceCompanySocialLink
        read_only_fields = []
        fields = ["social_link"] + read_only_fields


class DocumentSerializer(BaseSerializer):
    file_path = serializers.SerializerMethodField()

    class Meta:
        model = Document
        read_only_fields = ["uuid", "upload_finished_at", "file_size", "file_path"]
        fields = ["property", "mineral", "will", "message"] + read_only_fields

    def get_file_path(self, obj):
        return f"{settings.AWS_S3_DOCUMENT_BUCKET_NAME}/{obj.s3_url}"

    def get_presigned_url(self, mineral=None, property=None, will=None, message=None):
        file = Document(
            mineral=mineral, property=property, will=will, message=message, s3_url=None
        )
        file.full_clean()
        file.save()

        upload_path = utils.document_upload_path(file)

        file.s3_url = file.s3_url.field.attr_class(file, file.s3_url.field, upload_path)
        file.save()

        presigned_data = utils.s3_generate_document_presigned_post(
            file_path=upload_path
        )

        return {"uuid": file.uuid, **presigned_data}


class PictureSerializer(BaseSerializer):
    file_path = serializers.SerializerMethodField()

    class Meta:
        model = Document
        read_only_fields = ["uuid", "upload_finished_at", "file_size", "file_path"]
        fields = [] + read_only_fields

    def get_file_path(self, obj):
        return f"https://{settings.AWS_S3_PICTURE_BUCKET_NAME}.s3.amazonaws.com/{obj.s3_url}"

    def get_presigned_url(self):
        file = Picture()
        file.full_clean()
        file.save()

        upload_path = utils.picture_upload_path(file)

        file.s3_url = file.s3_url.field.attr_class(file, file.s3_url.field, upload_path)
        file.save()

        presigned_data = utils.s3_generate_picture_presigned_post(file_path=upload_path)

        return {"uuid": file.uuid, **presigned_data}


class MineralSerializer(BaseSerializer):
    documents_data = serializers.SerializerMethodField(read_only=True)
    mineral_type_data = MineralTypeSerializer(source="mineral_type", required=False)

    class Meta:
        model = models.Mineral
        read_only_fields = ["id"]
        fields = [
            "property",
            "mineral_type",
            "mineral_type_data",
            "mineral_type_custom",
            "document_type",
            "percent_owned",
            "documents_data",
        ] + read_only_fields

    def get_documents_data(self, obj):
        documents = models.Document.objects.filter(
            mineral=obj, upload_finished_at__isnull=False
        )
        return DocumentSerializer(documents, read_only=True, many=True).data


class PropertySerializer(BaseSerializer):
    class _MineralSerializer(MineralSerializer):
        class Meta(MineralSerializer.Meta):
            fields = [
                "mineral_type",
                "mineral_type_data",
                "mineral_type_custom",
                "document_type",
                "percent_owned",
                "documents_data",
            ]

    state_data = RegionSerializer(source="state", read_only=True)
    county_data = SubRegionSerializer(source="county", read_only=True)
    minerals = _MineralSerializer(many=True, write_only=True, required=False)
    minerals_data = MineralSerializer(source="minerals", many=True, read_only=True)
    documents_data = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.Property
        read_only_fields = ["id", "owner"]
        fields = [
            "alias",
            "legal_description",
            "comments",
            "state",
            "state_data",
            "county",
            "county_data",
            "property_address",
            "property_city",
            "property_state",
            "property_zipcode",
            "minerals",
            "minerals_data",
            "documents_data",
        ] + read_only_fields

    def get_documents_data(self, obj):
        documents = models.Document.objects.filter(
            property=obj, upload_finished_at__isnull=False
        )
        return DocumentSerializer(documents, read_only=True, many=True).data

    def create(self, validated_data):
        minerals = validated_data.pop("minerals", None)

        validated_data["owner"] = self.user.owner

        instance = super().create(validated_data)

        if minerals is not None:
            models.Mineral.objects.bulk_create(
                models.Mineral(**mineral, property=instance) for mineral in minerals
            )

        return instance

    def update(self, instance, validated_data):
        minerals = validated_data.pop("minerals", None)

        instance = super().update(instance, validated_data)

        if minerals is not None:
            instance.minerals.all().delete()
            models.Mineral.objects.bulk_create(
                models.Mineral(**mineral, property=instance) for mineral in minerals
            )

        return instance


class LandOwnerSerializer(BaseSerializer):
    user_data = UserSerializer(source="user", read_only=True)
    physical_city_data = CitySerializer(source="physical_city", read_only=True)
    physical_state_data = RegionSerializer(source="physical_state", read_only=True)
    mailing_city_data = CitySerializer(source="mailing_city", read_only=True)
    mailing_state_data = RegionSerializer(source="mailing_state", read_only=True)
    attorney_city_data = CitySerializer(source="attorney_city", read_only=True)
    attorney_state_data = RegionSerializer(source="attorney_state", read_only=True)
    properties_data = PropertySerializer(source="properties", many=True, read_only=True)

    class Meta:
        model = models.LandOwner
        read_only_fields = ["user", "user_data"]
        fields = [
            "first_name",
            "middle_name",
            "last_name",
            "maiden_name",
            "aka",
            "owner_category",
            "physical_street",
            "physical_city",
            "physical_city_data",
            "physical_state",
            "physical_state_data",
            "physical_zipcode",
            "mailing_street",
            "mailing_city",
            "mailing_city_data",
            "mailing_state",
            "mailing_state_data",
            "mailing_zipcode",
            "preferred_contact_method",
            "cell_phone",
            "secondary_phone",
            "contact_name",
            "contact_phone",
            "contact_email",
            "rights_for",
            "is_rights_inherit_in_a_will",
            "is_rights_probated",
            "has_attorney",
            "attorney_first_name",
            "attorney_last_name",
            "attorney_company_name",
            "attorney_street",
            "attorney_city",
            "attorney_city_data",
            "attorney_state",
            "attorney_state_data",
            "attorney_zipcode",
            "how_many_properties",
            "preferred_contact_method",
            "properties_data",
        ] + read_only_fields


class LandOwnerRegisterSerializer(UserRegisterSerializerMixin, LandOwnerSerializer):
    properties = PropertySerializer(many=True, write_only=True, required=False)

    class Meta(LandOwnerSerializer.Meta):
        fields = LandOwnerSerializer.Meta.fields + [
            "email",
            "password1",
            "password2",
            "properties",
        ]

    def create_related(self, user):
        owner_data = self.validated_data
        owner_data.pop("email")
        owner_data.pop("password1")
        owner_data.pop("password2")
        owner_data["user"] = user
        properties = owner_data.pop("properties", None)

        owner = models.LandOwner.objects.create(**owner_data)

        if properties is not None:
            for p in properties:
                minerals = p.pop("minerals", None)
                property_obj = models.Property.objects.create(**p, owner=owner)
                if minerals is not None:
                    models.Mineral.objects.bulk_create(
                        models.Mineral(**mineral, property=property_obj)
                        for mineral in minerals
                    )


class LandOwnerSocialRegisterSerializer(SocialLoginSerializer, LandOwnerSerializer):
    class Meta(LandOwnerSerializer.Meta):
        fields = LandOwnerSerializer.Meta.fields + ["access_token"]

    def validate(self, attrs):
        attrs = super().validate(attrs)
        owner_data = attrs.copy()
        owner_data.pop("access_token")
        models.LandOwner.objects.update_or_create(
            user=owner_data["user"].id, defaults=owner_data
        )
        return attrs


class ShortInquirySerializer(BaseSerializer):
    looking_state_data = RegionSerializer(source="looking_state", read_only=True)
    looking_country_data = CountrySerializer(source="looking_country", read_only=True)
    minerals_of_interest = MineralSerializer(many=True, required=False)
    properties_data = PropertySerializer(source="properties", many=True, read_only=True)
    services_data = ServiceCompanyServiceSerializer(
        source="services", many=True, read_only=True
    )

    class Meta:
        model = models.Inquiry
        read_only_fields = ["id", "owner"]
        fields = [
            "category",
            "initiated_at",
            "status",
            "looking_for",
            "minerals_of_interest",
            "looking_state",
            "looking_state_data",
            "looking_country",
            "looking_country_data",
            "comment",
            "properties",
            "properties_data",
            "services",
            "services_data",
        ] + read_only_fields


class InquiryServiceCompanySerializer(BaseSerializer):
    inquiry_data = ShortInquirySerializer(source="inquiry", read_only=True)

    class Meta:
        model = models.InquiryServiceCompany
        read_only_fields = ["id"]
        fields = [
            "inquiry",
            "inquiry_data",
            "service_company",
            "overall_experience_rate",
            "timeline_rate",
            "completeness_of_project_rate",
            "rate_comment",
        ] + read_only_fields


class ServiceCompanySerializer(BaseSerializer):
    user_data = UserSerializer(source="user", read_only=True)
    contacts = ServiceCompanyContactSerializer(many=True)
    city_data = CitySerializer(source="city", read_only=True)
    state_data = RegionSerializer(source="state", read_only=True)
    phones = ServiceCompanyPhoneSerializer(many=True)
    preferred_states = ServiceCompanyPreferredStateSerializer(many=True)
    preferred_states_data = RegionSerializer(source="preferred_states", read_only=True)
    services_data = ServiceCompanyServiceSerializer(
        source="services", many=True, read_only=True
    )
    look_for_minerals_data = MineralTypeSerializer(
        source="look_for_minerals", many=True, read_only=True
    )
    certifications = ServiceCompanyCertificationRelationSerializer(
        many=True, write_only=True
    )
    certifications_data = ServiceCompanyCertificationRelationSerializer(
        source="certifications", many=True, read_only=True
    )
    social_links = ServiceCompanySocialLinkSerializer(many=True)
    inquiries_data = InquiryServiceCompanySerializer(
        source="inquiries", many=True, read_only=True
    )
    photo_data = PictureSerializer(source="photo", read_only=True)

    class Meta:
        model = models.ServiceCompany
        read_only_fields = ["user", "user_data"]
        fields = [
            "company_name",
            "contacts",
            "address",
            "city",
            "city_data",
            "state",
            "state_data",
            "zipcode",
            "phones",
            "preferred_states",
            "preferred_states_data",
            "services",
            "services_data",
            "look_for_properties",
            "look_for_minerals",
            "look_for_minerals_data",
            "look_for_minerals_custom",
            "interested_in",
            "deal_value_preference_min",
            "deal_value_preference_max",
            "certifications",
            "certifications_data",
            "social_links",
            "website_url",
            "photo",
            "photo_data",
            "inquiries_data",
        ] + read_only_fields

    def update(self, instance, validated_data):
        contacts = validated_data.pop("contacts", None)
        phones = validated_data.pop("phones", None)
        preferred_states = validated_data.pop("preferred_states", None)
        social_links = validated_data.pop("social_links", None)
        certifications = validated_data.pop("certifications", None)

        instance = super().update(instance, validated_data)

        if contacts is not None:
            instance.contacts.all().delete()
            models.ServiceCompanyContact.objects.bulk_create(
                models.ServiceCompanyContact(**contact, service_company=instance)
                for contact in contacts
            )

        if phones is not None:
            instance.phones.all().delete()
            models.ServiceCompanyPhone.objects.bulk_create(
                models.ServiceCompanyPhone(**phone, service_company=instance)
                for phone in phones
            )

        if preferred_states is not None:
            instance.preferred_states.all().delete()
            models.ServiceCompanyPreferredState.objects.bulk_create(
                models.ServiceCompanyPreferredState(
                    **preferred_state, service_company=instance
                )
                for preferred_state in preferred_states
            )

        if social_links is not None:
            instance.social_links.all().delete()
            models.ServiceCompanySocialLink.objects.bulk_create(
                models.ServiceCompanySocialLink(**social_link, service_company=instance)
                for social_link in social_links
            )

        if certifications is not None:
            instance.certifications.all().delete()
            models.ServiceCompanyCertificationRelation.objects.bulk_create(
                models.ServiceCompanyCertificationRelation(
                    **certification, service_company=instance
                )
                for certification in certifications
            )

        return instance


class ServiceCompanyRegisterSerializer(
    UserRegisterSerializerMixin, ServiceCompanySerializer
):
    class Meta(ServiceCompanySerializer.Meta):
        fields = ServiceCompanySerializer.Meta.fields + [
            "email",
            "password1",
            "password2",
        ]

    def create_related(self, user):
        service_company_data = self.validated_data
        service_company_data.pop("email")
        service_company_data.pop("password1")
        service_company_data.pop("password2")
        service_company_data["user"] = user
        services = service_company_data.pop("services", [])
        certifications = service_company_data.pop("certifications", [])
        look_for_minerals = service_company_data.pop("look_for_minerals", [])
        contacts = service_company_data.pop("contacts", [])
        phones = service_company_data.pop("phones", [])
        preferred_states = service_company_data.pop("preferred_states", [])
        social_links = service_company_data.pop("social_links", [])

        service_company = models.ServiceCompany.objects.create(**service_company_data)

        service_company.look_for_minerals.set(look_for_minerals)
        service_company.services.set(services)
        models.ServiceCompanyContact.objects.bulk_create(
            models.ServiceCompanyContact(**contact, service_company=service_company)
            for contact in contacts
        )
        models.ServiceCompanyPhone.objects.bulk_create(
            models.ServiceCompanyPhone(**phone, service_company=service_company)
            for phone in phones
        )
        models.ServiceCompanyPreferredState.objects.bulk_create(
            models.ServiceCompanyPreferredState(
                **preferred_state, service_company=service_company
            )
            for preferred_state in preferred_states
        )
        models.ServiceCompanyCertificationRelation.objects.bulk_create(
            models.ServiceCompanyCertificationRelation(
                **certification, service_company=service_company
            )
            for certification in certifications
        )
        models.ServiceCompanySocialLink.objects.bulk_create(
            models.ServiceCompanySocialLink(
                **social_link, service_company=service_company
            )
            for social_link in social_links
        )


class ServiceCompanySocialRegisterSerializer(
    SocialLoginSerializer, ServiceCompanySerializer
):
    class Meta(ServiceCompanySerializer.Meta):
        fields = ServiceCompanySerializer.Meta.fields + ["access_token"]

    def validate(self, attrs):
        attrs = super().validate(attrs)
        owner_data = attrs.copy()
        owner_data.pop("access_token")
        models.LandOwner.objects.update_or_create(
            user=owner_data["user"].id, defaults=owner_data
        )
        return attrs


class HeirSerializer(BaseSerializer):
    died_city_data = CitySerializer(source="died_city", read_only=True)
    died_state_data = RegionSerializer(source="died_state", read_only=True)
    died_country_data = CountrySerializer(source="died_country", read_only=True)
    probate_city_data = CitySerializer(source="probate_city", read_only=True)
    probate_state_data = RegionSerializer(source="probate_state", read_only=True)
    probate_country_data = CountrySerializer(source="probate_country", read_only=True)
    potential_city_data = CitySerializer(source="potential_city", read_only=True)
    potential_state_data = RegionSerializer(source="potential_state", read_only=True)

    class Meta:
        model = models.Heir
        read_only_fields = ["id"]
        fields = [
            "property",
            "relationship",
            "heir_type",
            "first_name",
            "last_name",
            "deceased",
            "died_city",
            "died_city_data",
            "died_state",
            "died_state_data",
            "died_country",
            "died_country_data",
            "died_year",
            "estate_probated",
            "probate_city",
            "probate_city_data",
            "probate_state",
            "probate_state_data",
            "probate_country",
            "probate_country_data",
            "age",
            "included_in_will",
            "potential_street",
            "potential_city",
            "potential_city_data",
            "potential_state",
            "potential_state_data",
            "potential_zipcode",
        ] + read_only_fields

    def validate(self, attrs):
        attrs = super().validate(attrs)

        relationships = {
            models.Heir.HEIR_TYPE_PREVIOUS: [
                models.Heir.RELATIONSHIP_PARENT,
                models.Heir.RELATIONSHIP_GRANDPARENT,
                models.Heir.RELATIONSHIP_SPOUSE,
                models.Heir.RELATIONSHIP_SIBLING,
                models.Heir.RELATIONSHIP_OTHER,
            ],
            models.Heir.HEIR_TYPE_POTENTIAL: [
                models.Heir.RELATIONSHIP_SON,
                models.Heir.RELATIONSHIP_GRANDSON,
                models.Heir.RELATIONSHIP_DAUGHTER,
                models.Heir.RELATIONSHIP_GRANDDAUGHTER,
                models.Heir.RELATIONSHIP_OTHER,
            ],
        }
        if attrs.get("heir_type"):
            if attrs.get("relationship") not in relationships.get(attrs["heir_type"]):
                raise ValidationError("Invalid relationship")

        return attrs


class WillSerializer(BaseSerializer):
    class Meta:
        model = models.Will
        read_only_fields = ["id"]
        fields = [
            "heir",
            "description",
            "location_of_will",
            "location_of_will_contact_phone",
        ] + read_only_fields


class InquirySerializer(BaseSerializer):
    looking_state_data = RegionSerializer(source="looking_state", read_only=True)
    looking_country_data = CountrySerializer(source="looking_country", read_only=True)
    minerals_of_interest = MineralSerializer(many=True, required=False)
    properties_data = PropertySerializer(source="properties", many=True, read_only=True)
    services_data = ServiceCompanyServiceSerializer(
        source="services", many=True, read_only=True
    )
    service_companies_data = InquiryServiceCompanySerializer(
        source="inquiry_service_companies", many=True, read_only=True
    )

    class Meta:
        model = models.Inquiry
        read_only_fields = ["id", "owner"]
        fields = [
            "category",
            "initiated_at",
            "status",
            "looking_for",
            "minerals_of_interest",
            "looking_state",
            "looking_state_data",
            "looking_country",
            "looking_country_data",
            "comment",
            "properties",
            "properties_data",
            "services",
            "services_data",
            "service_companies_data",
        ] + read_only_fields

    def validate(self, attrs):
        attrs["owner"] = self.user.owner
        attrs["initiated_at"] = datetime.now()
        attrs = super().validate(attrs)
        return attrs


class MessageSerializer(BaseSerializer):
    sender_data = serializers.SerializerMethodField()
    recipient_data = serializers.SerializerMethodField()
    attachments_data = serializers.SerializerMethodField()

    class Meta:
        model = models.Message
        read_only_fields = ["id", "sender"]
        fields = [
            "sender_data",
            "recipient",
            "recipient_data",
            "content",
            "attachments_data",
        ] + read_only_fields

    def validate(self, attrs):
        attrs["sender"] = self.user
        attrs = super().validate(attrs)
        return attrs

    def get_sender_data(self, obj):
        if obj.sender.is_owner:
            return LandOwnerSerializer(instance=obj.sender.owner).data
        elif obj.sender.is_service_company:
            return ServiceCompanySerializer(instance=obj.sender.service_company).data
        else:
            return UserSerializer(instance=obj.sender).data

    def get_recipient_data(self, obj):
        if obj.sender.is_owner:
            return LandOwnerSerializer(instance=obj.sender.owner).data
        elif obj.sender.is_service_company:
            return ServiceCompanySerializer(instance=obj.sender.service_company).data
        else:
            return UserSerializer(instance=obj.sender).data

    def get_attachments_data(self, obj):
        documents = models.Document.objects.filter(
            message=obj, upload_finished_at__isnull=False
        )
        return [DocumentSerializer(instance=document).data for document in documents]
