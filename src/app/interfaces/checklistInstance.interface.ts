export interface ChecklistInstance {
        _id: string,
        user_id: string,
        checklist_id: {
            type: string,
            name: string,
            icon: string,
            description: string,
            department: string,
            maxOverdueDays: string,
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
        content: { 
            name: string, // nombre seccion
            type: string, // [FREE_LINE, FIXED_LINE]
            freeValues: 
                {
                    images: string[],
                    text: string
                }[]
        }[]
           
}