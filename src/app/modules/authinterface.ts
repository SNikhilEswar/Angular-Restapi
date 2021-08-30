// 	string	A Firebase Auth ID token for the authenticated user.
// 	string	The email for the authenticated user.
// 	string	A Firebase Auth refresh token for the authenticated user.
// 	string	The number of seconds in which the ID token expires.
// 	string	The uid of the authenticated user.
// 

export interface AuthResponse {
    idToken:string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}