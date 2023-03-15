// 0: label 单个的功能 1: menu 菜单/路径
type PermissionType = 0 | 1;

type PermissionQuery = Pick<Permission, 'permission' | "type">

type PermissionPageQuery = WithPageQuery<PermissionQuery>

/** 权限 */
interface Permission {
    type: PermissionType;
    // 权限字符串
    permission: string;
    // 上级id
    parentId: string;
    icon: string;
    // 路径
    url: string;
    // 菜单名称
    menuName: string;
}