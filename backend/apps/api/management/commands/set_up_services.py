from django.core.management import BaseCommand

from apps.api.models import ServiceCompanyService

services_data = [
    {"service": "Loan Against Assets"},
    {"service": "Estate Lawyer - Planning"},
    {"service": "Estate Lawyer - Probate"},
    {"service": "Oil & Gas Lawyer"},
    {"service": "Appraise Assets"},
    {"service": "Landman - Ownership Issues"},
    {"service": "Landman - Lease Negotiation"},
    {"service": "Landman - Courthouse Work"},
    {"service": "Landman - Escheatment Issues"},
    {"service": "Division Order Assistance"},
    {"service": "Estate Management Firms"},
    {"service": "Auditing Revenue"},
    {"service": "CPA - Tax Help"},
    {"service": "Sell Assets - Auction"},
    {"service": "Sell Assets - Broker"},
]


class Command(BaseCommand):
    def handle(self, *args, **options):
        ServiceCompanyService.objects.bulk_create(
            ServiceCompanyService(**service_data) for service_data in services_data
        )
