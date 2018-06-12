export interface UserModel {
    id: number,
    username: string,
    roles: string,
    exp: number
}

const isAdmin = (user: UserModel): boolean => user.roles.split(',').includes('admin');

export default { isAdmin }
