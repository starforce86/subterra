from django.core.management import BaseCommand

from apps.api.models import MineralType

mineral_types_data = [
    {"title": "Oil & Gas"},
    {"title": "Oil"},
    {"title": "Gas"},
    {"title": "Water"},
    {"title": "Carbon"},
    {"title": "Rare Earth"},
    {"title": "Other"},
]


class Command(BaseCommand):
    def handle(self, *args, **options):
        MineralType.objects.bulk_create(
            MineralType(**mineral_type_data) for mineral_type_data in mineral_types_data
        )
