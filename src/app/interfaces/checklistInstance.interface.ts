import { User } from './user.interface';

export interface ChecklistInstance {
        _id: string,
        user_id: User,
        checklist_id: {
            type: string,
            name: string,
            icon: string,
            description: string,
            department: string,
            maxOverdueDays: string,
            thumbnail: string,
            checkpoints: any[] // este campo solo se va a usar si el tipo es OPS y tiene que almacenar los campos fijos
        },
        status: string, // ['ASSIGNED', 'REVIEW-PENDING', 'REVIEWED']
        subType: string,
        startDate: string, // fecha de inicio de la tarea
        dueDate: string, // fecha expiracion tarea
        overdueDate: string, // fecha de margen para realizar la tarea habiando expirado
        shift: string, // turno
        lineSupervisor: string,
        signingDate: string, // firma
        signingInfo: string, // blockchain
        comments: [],
        content: { 
            section: string,
            checkpoints: {
                checked: boolean,
                name: string, // nombre pregunta en la seccion
                type: string, // [FREE_LINE, FIXED_LINE]
                score: number, // 0, 1, 2, 3, 4, 5
                observations: 
                    {
                        images: string[],
                        text: string
                    }[]
            }[]
        }[]
           
}