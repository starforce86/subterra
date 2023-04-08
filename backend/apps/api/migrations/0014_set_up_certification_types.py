from django.db import migrations

from apps.api.management.commands.set_up_certification_types import (
    certification_types_data,
)


def add_certification_types(apps, schema_editor):
    CertificationType = apps.get_model("api", "CertificationType")
    for certification_type_data in certification_types_data:
        CertificationType.objects.get_or_create(title=certification_type_data["title"])


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0013_auto_20230118_1827"),
    ]

    operations = [
        migrations.RunPython(code=add_certification_types, elidable=False),
    ]
