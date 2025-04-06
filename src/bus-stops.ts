// bus-stops.ts

export interface BusStop {
    position: { lat: number; lng: number };
    label: string;
    title: string;
    description: string;
    icon: {
      url: string;
      scaledSize: google.maps.Size;
    };
    lines: { code: string; color: string }[];
  }
  
  export function getBusStops(): BusStop[] {

   return [
    {
      position: { lat: -11.959125949367095, lng: -76.9868337155503 },
      label: '1',
      title: 'Estacion del Tren',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },

    {
      position: { lat: -11.95562410698981, lng: -76.99216732365588},
      label: '2',
      title: 'Farmacia LEO',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },

    {
      position: { lat: -11.960100717107052, lng: -76.99952393519997},
      label: '3',
      title: 'Paradero 15', 
      description: 'Este es el paradero de Plaza San Martín.',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },

    { 

      position: { lat: -11.962959139340485, lng: -77.00090347183564},
      label: '4',
      title: 'Santa Rosa',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },

    {
      position: { lat: -11.975104895328354, lng: -77.00889918442113},
      label: '5',
      title: 'El Periodista', 
      description: 'Este es el paradero de Plaza San Martín.',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -11.980657094195966, lng: -77.01243074554492 },
      label: '6',
      title: 'Canto Bello',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -11.984810108835445, lng: -77.00710630458597 },
      label: '7',
      title: 'San Carlos',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -11.985785660149244, lng: -77.00354021477605 },
      label: '8',
      title: '13 de Enero',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -11.989988794250095, lng: -77.00504061625797 },
      label: '9',
      title: 'Jorge Basadre',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -11.995925025514751, lng: -77.00529711873268 },
      label: '10',
      title: 'Los Postes',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.00367358266707, lng: -77.0026499702748 },
      label: '11',
      title: 'La Hacienda',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.011155708775137, lng: -76.99879085383671 },
      label: '12',
      title: 'Celima',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.016358486872864, lng: -76.99731010351225 },
      label: '13',
      title: 'Av. Lurigancho',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.017873587180432, lng: -77.00194441138302 },
      label: '14',
      title: 'Av. Piramide',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.025610739539303, lng: -77.00189068853754 },
      label: '15',
      title: 'Chimu',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.027548313791758, lng: -77.00129968121986 },
      label: '16',
      title: 'Malecon Checa',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.029219549995465, lng: -77.00056467278458 },
      label: '17',
      title: 'Puente Nuevo',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.032721389870941, lng: -76.99880414129814 },
      label: '18',
      title: 'Av. Las Magnolias',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.039661922468802, lng: -76.99758123390536 },
      label: '19',
      title: 'Ovalo de la Paz',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.044301663827548, lng: -76.99801374096475 },
      label: '20',
      title: 'Mariano Melgar',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.048076155927433, lng: -77.00060828031812 },
      label: '21',
      title: 'Municipalidad de El Agustino',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.051849528919954, lng: -77.00325282714468 },
      label: '22',
      title: 'Inca Ripac',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.058576081469035, lng: -77.00726228372595 },
      label: '23',
      title: 'Nicolas Ayllon',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.062811419271007, lng: -77.00281502814111 },
      label: '24',
      title: 'Mexico / Ayllon',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.067870544759336, lng: -77.00614938259328 },
      label: '25',
      title: 'San Luis / Mexico',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.071618639515401, lng: -77.01126804824153 },
      label: '26',
      title: 'Mexico / Aviacion',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.073065137606337, lng: -77.01607459058286 },
      label: '27',
      title: 'Parinacochas',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.074633482762401, lng: -77.02320078493968 },
      label: '28',
      title: 'Palermo',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    },
    {
      position: { lat: -12.077543856915058, lng: -77.03411813524471 },
      label: '29',
      title: 'Petit Thouars',
      description: 'Paradero principal de buses',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png',
        scaledSize: new google.maps.Size(20, 20)
      },
      lines: [
        { code: '3702', color: '#1976D2' },
        { code: '3707', color: '#D32F2F' },
        { code: '3805', color: '#9E9E9E' },
        { code: '7607', color: '#0288D1' }
      ]
    }
    // Agrega más paraderos aquí...
  ];
  };