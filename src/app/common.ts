export class GlobalConstants {
    public static userName: string = sessionStorage.getItem("userName")
    public static userRole: string = sessionStorage.getItem("userRole")
    public static userId: any = sessionStorage.getItem("userId")
    public static token: any = sessionStorage.getItem("token")
}