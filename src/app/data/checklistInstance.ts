export const CHECKLISTINSTANCES = [

    {
        _id: '1',
        user_id: '',
        checklist_id: {
            type: 'CHECKLIST',
            name: 'Checklist GS1',
            icon: 'maquinaria.png',
            description: 'Description of checklist GS1',
            department: '',
            maxOverdueDays: '',
            checkpoints: [] // este campo solo se va a usar si el tipo es OPS y tiene que almacenar los campos fijos
        },
        status: 'ASSIGNED', // ['ASSIGNED', 'REVIEW-PENDING', 'REVIEWED']
        subType: 'PUNTUAL',
        startDate: '', // fecha de inicio de la tarea
        dueDate: '2020-05-29T15:30:56.438Z', // fecha expiracion tarea
        overdueDate: '', // fecha de expiracion
        shift: '', // turno
        lineSupervisor: 'not informed yet',
        signingDate: '', // firma
        signingInfo: '', // blockchain
        content: [
            {
                name: 'Barreras', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera rota'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera deteriorada'
                    },
                ],
            },
            {
                name: 'Sensores', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 2 Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 3 Roto'
                    },
                ],
            },
            {
                name: 'Orden y Limpieza', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Pasillo 2 sucio'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Desorden en compuerta 4'
                    },
                ],
            }
        ]   
    },
    {
        _id: '2',
        user_id: '',
        checklist_id: {
            type: 'CHECKLIST',
            name: 'Checklist GS2',
            icon: 'maquinaria.png',
            description: 'Description of checklist GS1',
            department: '',
            maxOverdueDays: '',
            checkpoints: [] // este campo solo se va a usar si el tipo es OPS y tiene que almacenar los campos fijos
        },
        status: 'ASSIGNED',
        subType: 'PUNTUAL',
        startDate: '',
        dueDate: '2020-06-12T15:30:56.438Z',
        overdueDate: '',
        shift: '',
        lineSupervisor: 'not informed yet',
        signingDate: '',
        signingInfo: '',
        content: [
            {
                name: 'Barreras', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera rota'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera deteriorada'
                    },
                ],
            },
            {
                name: 'Sensores', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 2 Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 3 Roto'
                    },
                ],
            },
            {
                name: 'Orden y Limpieza', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Pasillo 2 sucio'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Desorden en compuerta 4'
                    },
                ],
            }
        ]    
    },
    {
        _id: '3',
        user_id: '',
        checklist_id: {
            type: 'CHECKLIST',
            name: 'Checklist Tomo 2',
            icon: 'maquinaria.png',
            description: 'Description of checklist GS1',
            department: '',
            maxOverdueDays: '',
            checkpoints: [] // este campo solo se va a usar si el tipo es OPS y tiene que almacenar los campos fijos
        },
        status: 'REVIEW-PENDING',
        subType: 'PUNTUAL',
        startDate: '',
        dueDate: '2020-06-02T15:30:56.438Z',
        overdueDate: '',
        shift: '',
        lineSupervisor: 'not informed yet',
        signingDate: '',
        signingInfo: '',
        content: [
            {
                name: 'Barreras', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera rota'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera deteriorada'
                    },
                ],
            },
            {
                name: 'Sensores', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 2 Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 3 Roto'
                    },
                ],
            },
            {
                name: 'Orden y Limpieza', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Pasillo 2 sucio'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Desorden en compuerta 4'
                    },
                ],
            }
        ]    
    },
    {
        _id: '4',
        user_id: '',
        checklist_id: {
            type: 'CHECKLIST',
            name: 'Checklist GOP',
            icon: 'maquinaria.png',
            description: 'Description of checklist GS1',
            department: '',
            maxOverdueDays: '',
            checkpoints: [] // este campo solo se va a usar si el tipo es OPS y tiene que almacenar los campos fijos
        },
        status: 'REVIEW-PENDING',
        subType: 'PUNTUAL',
        startDate: '',
        dueDate: '2020-05-05T15:30:56.438Z',
        overdueDate: '',
        shift: '',
        lineSupervisor: 'not informed yet',
        signingDate: '',
        signingInfo: '',
        content: [
            {
                name: 'Barreras', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera rota'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera deteriorada'
                    },
                ],
            },
            {
                name: 'Sensores', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 2 Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 3 Roto'
                    },
                ],
            },
            {
                name: 'Orden y Limpieza', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Pasillo 2 sucio'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Desorden en compuerta 4'
                    },
                ],
            }
        ]    
    },
    {
        _id: '5',
        user_id: '',
        checklist_id: {
            type: 'CHECKLIST',
            name: 'Checklist MLH',
            icon: 'maquinaria.png',
            description: 'Description of checklist GS1',
            department: '',
            maxOverdueDays: '',
            checkpoints: [] // este campo solo se va a usar si el tipo es OPS y tiene que almacenar los campos fijos
        },
        status: 'REVIEWED',
        subType: 'PUNTUAL',
        startDate: '',
        dueDate: '2020-04-23T15:30:56.438Z',
        overdueDate: '',
        shift: '',
        lineSupervisor: 'not informed yet',
        signingDate: '',
        signingInfo: '',
        content: [
            {
                name: 'Barreras', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera rota'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera deteriorada'
                    },
                ],
            },
            {
                name: 'Sensores', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 2 Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 3 Roto'
                    },
                ],
            },
            {
                name: 'Orden y Limpieza', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Pasillo 2 sucio'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Desorden en compuerta 4'
                    },
                ],
            }
        ]   
    },
    {
        _id: '6',
        user_id: '',
        checklist_id: {
            type: 'CHECKLIST',
            name: 'Checklist PTT',
            icon: 'maquinaria.png',
            description: 'Description of checklist GS1',
            department: '',
            maxOverdueDays: '',
            checkpoints: [] // este campo solo se va a usar si el tipo es OPS y tiene que almacenar los campos fijos
        },
        status: 'REVIEWED',
        subType: 'PUNTUAL',
        startDate: '',
        dueDate: '2020-05-10T15:30:56.438Z',
        overdueDate: '',
        shift: '',
        lineSupervisor: 'not informed yet',
        signingDate: '',
        signingInfo: '',
        content: [
            {
                name: 'Barreras', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera rota'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera deteriorada'
                    },
                ],
            },
            {
                name: 'Sensores', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 2 Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 3 Roto'
                    },
                ],
            },
            {
                name: 'Orden y Limpieza', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Pasillo 2 sucio'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Desorden en compuerta 4'
                    },
                ],
            }
        ]    
    },
    {
        _id: '7',
        user_id: '',
        checklist_id: {
            type: 'CHECKLIST',
            name: 'Checklist GS1',
            icon: 'maquinaria.png',
            description: 'Description of checklist GS1',
            department: '',
            maxOverdueDays: '',
            checkpoints: [] // este campo solo se va a usar si el tipo es OPS y tiene que almacenar los campos fijos
        },
        status: 'ASSIGNED', // ['ASSIGNED', 'REVIEW-PENDING', 'REVIEWED']
        subType: 'PUNTUAL',
        startDate: '', // fecha de inicio de la tarea
        dueDate: '2020-04-12T15:30:56.438Z', // fecha expiracion tarea
        overdueDate: '', // fecha de expiracion
        shift: '', // turno
        lineSupervisor: 'not informed yet',
        signingDate: '', // firma
        signingInfo: '', // blockchain
        content: [
            {
                name: 'Barreras', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera rota'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera deteriorada'
                    },
                ],
            },
            {
                name: 'Sensores', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 2 Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 3 Roto'
                    },
                ],
            },
            {
                name: 'Orden y Limpieza', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Pasillo 2 sucio'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Desorden en compuerta 4'
                    },
                ],
            }
        ]   
    },
    {
        _id: '8',
        user_id: '',
        checklist_id: {
            type: 'CHECKLIST',
            name: 'Checklist GS1',
            icon: 'maquinaria.png',
            description: 'Description of checklist GS1',
            department: '',
            maxOverdueDays: '',
            checkpoints: [] // este campo solo se va a usar si el tipo es OPS y tiene que almacenar los campos fijos
        },
        status: 'ASSIGNED', // ['ASSIGNED', 'REVIEW-PENDING', 'REVIEWED']
        subType: 'PUNTUAL',
        startDate: '', // fecha de inicio de la tarea
        dueDate: '2020-03-06T15:30:56.438Z', // fecha expiracion tarea
        overdueDate: '', // fecha de expiracion
        shift: '', // turno
        lineSupervisor: 'not informed yet',
        signingDate: '', // firma
        signingInfo: '', // blockchain
        content: [
            {
                name: 'Barreras', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera rota'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Barrera deteriorada'
                    },
                ],
            },
            {
                name: 'Sensores', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 2 Roto'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Sensor 3 Roto'
                    },
                ],
            },
            {
                name: 'Orden y Limpieza', // nombre seccion
                type: 'FREE_LINE',
                freeValues: [
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Pasillo 2 sucio'
                    },
                    {
                        images: ['av-1.png', 'av-2.png'],
                        text: 'Desorden en compuerta 4'
                    },
                ],
            }
        ]   
    },
];