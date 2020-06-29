export interface Incidents {
    _id?: string,
    user_id: string,
    date?: string,
    department: string,
    location: string,
//    category: string,
    signingDate?: string,
    signingInfo?: string,
    insecureActs: string,
    insecureConditions: string,
    images: string[],
    name: string,
    description: string
}