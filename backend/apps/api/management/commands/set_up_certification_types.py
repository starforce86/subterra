from django.core.management import BaseCommand

from apps.api.models import CertificationType

certification_types_data = [
    {"title": "Registered Landman"},
    {"title": "Registered Petroleum Landman"},
    {"title": "Certified Petroleum Landman"},
    {"title": "Certified Professional Lease and Title Analyst"},
    {"title": "Petroleum Land Management"},
    {"title": "Certified Public Accountant"},
    {"title": "Certified Financial Planner"},
    {"title": "Juris Doctor"},
    {"title": "Oil, Gas, and Mineral Law"},
    {"title": "Estate Planning and Probate Law"},
    {"title": "Registered Mineral Manager"},
    {"title": "Certified Minerals Manager"},
    {"title": "Certified Trust and Fiduciary Advisor"},
    {"title": "Certificate in Trust Administration"},
    {"title": "Accredited Estate Planner"},
    {"title": "Chartered Trust and Estate Planners"},
    {"title": "Certified Estate Planner"},
    {"title": "Certified Division Order Analyst"},
]


class Command(BaseCommand):
    def handle(self, *args, **options):
        CertificationType.objects.bulk_create(
            CertificationType(**certification_type_data)
            for certification_type_data in certification_types_data
        )
