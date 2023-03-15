interface Role {
  name: string;
  permission: string[];
  isAdmin: BooleanNumber;
}

type RoleQuery = Pick<Role, "name">;

type RolePageQuery = WithPageQuery<RoleQuery>;
