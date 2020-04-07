export const CHECKLIST = 
 {
     id: 1,
     nombre: 'Máquina MK5',
     secciones: [
         {
             id: 1,
             nombre: 'Barreras',
             checkList: [
                 {
                     texto: 'Barrera deteriorada',
                     fotos: ['av-1.png', 'av-2.png', 'av-3.png']
                 },
                 {
                    texto: 'Barrera rota',
                    fotos: ['av-1.png', 'av-2.png']
                },
             ]
         },
         {
             id: 2,
             nombre: 'Sensores',
             checkList: [
                 {
                     texto: 'Sensor Roto',
                     fotos: ['av-1.png']
                 },
                 {
                    texto: 'Sensor 2 Roto',
                    fotos: ['av-3.png']
                },
                {
                    texto: 'Sensor 3 Roto',
                    fotos: ['av-4.png']
                }
             ]
         },
         {
            id: 3,
            nombre: 'Orden y Limpieza',
            checkList: [
                {
                    texto: 'Pasillo 2 sucio',
                    fotos: ['av-5.png']
                },
                {
                   texto: 'Desorden en compuerta 4',
                   fotos: ['av-6.png', 'av-2.png']
               }
            ]
        }
     ]
 };
