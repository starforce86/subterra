class ActionPermissionsMixin(object):
    permissions_map = None

    def get_permissions(self):
        permissions = super().get_permissions()
        is_permissions_map_set = isinstance(self.permissions_map, dict)

        if not is_permissions_map_set:
            return permissions

        if self.action in self.permissions_map:
            return self.get_permissions_from_map(self.action)

        if "default" in self.permissions_map:
            return self.get_permissions_from_map("default")

        return permissions

    def get_permissions_from_map(self, action):
        return [p() for p in self.permissions_map[action]]
