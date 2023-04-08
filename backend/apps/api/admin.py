from django.contrib import admin

from apps.api import models

admin.site.register(models.Mineral)
admin.site.register(models.Document)
admin.site.register(models.Inquiry)


@admin.register(models.LandOwner)
class LandOwnerAdmin(admin.ModelAdmin):
    autocomplete_fields = (
        "physical_city",
        "physical_state",
        "mailing_city",
        "mailing_state",
        "attorney_city",
        "attorney_state",
    )


@admin.register(models.ServiceCompany)
class ServiceCompanyAdmin(admin.ModelAdmin):
    autocomplete_fields = ("city", "state")


@admin.register(models.Property)
class PropertyAdmin(admin.ModelAdmin):
    autocomplete_fields = ("state", "county", "property_city", "property_state")
