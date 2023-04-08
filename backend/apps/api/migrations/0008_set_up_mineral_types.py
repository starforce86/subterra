from django.db import migrations

from apps.api.management.commands.set_up_mineral_types import mineral_types_data


def add_mineral_types(apps, schema_editor):
    MineralType = apps.get_model("api", "MineralType")
    for mineral_type_data in mineral_types_data:
        MineralType.objects.get_or_create(title=mineral_type_data["title"])


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_auto_20230111_1224"),
    ]

    operations = [
        migrations.RunPython(code=add_mineral_types, elidable=False),
    ]
