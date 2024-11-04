
export interface User {
    id: string;
    email: string | null | undefined;
    name: string | null | undefined;
    image: string | null | undefined;
    // role: string;
}
  
export  interface LoginCredentials {
    email: string;
    password: string;
}