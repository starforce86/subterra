from rest_framework import permissions

from apps.api import models


class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_owner


class IsServiceCompany(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_service_company


class IsOwnerOfProperty(permissions.BasePermission):
    def has_permission(self, request, view):
        property = models.Property.objects.get(pk=view.kwargs.get("pk"))
        return request.user.owner == property.owner


class IsOwnerRight(permissions.BasePermission):
    def has_permission(self, request, view):
        owner = models.LandOwner.objects.get(pk=view.kwargs.get("pk"))
        return request.user.owner == owner


class IsServiceCompanyRight(permissions.BasePermission):
    def has_permission(self, request, view):
        service_company = models.ServiceCompany.objects.get(pk=view.kwargs.get("pk"))
        return request.user.service_company == service_company


class IsPropertyRight(permissions.BasePermission):
    def has_permission(self, request, view):
        property_id = request.data.get("property")
        if property_id:
            property = models.Property.objects.get(pk=property_id)
            return request.user.owner == property.owner
        else:
            return True


class IsMineralRight(permissions.BasePermission):
    def has_permission(self, request, view):
        mineral = models.Mineral.objects.get(pk=view.kwargs.get("pk"))
        return request.user.owner == mineral.property.owner


class IsHeirRightPath(permissions.BasePermission):
    def has_permission(self, request, view):
        heir = models.Heir.objects.get(pk=view.kwargs.get("pk"))
        return request.user.owner == heir.property.owner


class IsHeirRightData(permissions.BasePermission):
    def has_permission(self, request, view):
        heir_id = request.data.get("heir")
        if heir_id:
            heir = models.Heir.objects.get(pk=heir_id)
            return request.user.owner == heir.property.owner
        else:
            return True


class IsWillRightPath(permissions.BasePermission):
    def has_permission(self, request, view):
        heir = models.Heir.objects.get(pk=view.kwargs.get("pk"))
        return request.user.owner == heir.property.owner
