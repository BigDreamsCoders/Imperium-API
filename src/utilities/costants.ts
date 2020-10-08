enum PrivilegesActions {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

enum Possession {
  ANY = 'any',
  OWN = 'own',
}

export const Privileges = {
  RESOURCES: {
    ROLES: 'ROLES',
    USERS: 'USERS',
    ADMIN: 'ADMIN',
  },
  ACTION: {
    C: PrivilegesActions.CREATE,
    R: PrivilegesActions.READ,
    U: PrivilegesActions.UPDATE,
    D: PrivilegesActions.DELETE,
  },
  POSSESSION: {
    ANY: Possession.ANY,
    OWN: Possession.OWN,
  },
};

export const DocumentationString = {
  TYPE: {
    ID: (entity: string) =>
      `${entity.charAt(0).toUpperCase()}${entity
        .slice(1)
        .toLowerCase()} id in string format`,
  },
};
