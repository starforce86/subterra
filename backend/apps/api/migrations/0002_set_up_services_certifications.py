from django.db import migrations

from apps.api.management.commands.set_up_certification_types import (
    certification_types_data,
)
from apps.api.management.commands.set_up_services import services_data


def add_services(apps, schema_editor):
    ServiceCompanyService = apps.get_model("api", "ServiceCompanyService")
    for service_data in services_data:
        ServiceCompanyService.objects.get_or_create(service=service_data["service"])


def add_certification_types(apps, schema_editor):
    CertificationType = apps.get_model("api", "CertificationType")
    for certification_type_data in certification_types_data:
        CertificationType.objects.get_or_create(title=certification_type_data["title"])


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(code=add_services, elidable=False),
        migrations.RunPython(code=add_certification_types, elidable=False),
    ]
