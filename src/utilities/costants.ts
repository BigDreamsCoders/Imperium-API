export const Privileges = {
  RESOURCES: {
    ROLES: 'ROLES',
    USERS: 'USERS',
  },
  ACTION: {
    C: 'create',
    R: 'read',
    U: 'update',
    D: 'delete',
  },
  POSSESSION: {
    ANY: 'any',
    OWN: 'own',
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
