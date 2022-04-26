import { mdiAbacus, mdiOpenSourceInitiative, mdiTicket, mdiViewCompactOutline } from '@mdi/js'

export default [
  {
    title: 'Activity',
    icon: mdiTicket,
    children: [
      {
        title: 'Initiative',
        icon: mdiOpenSourceInitiative,
        to: 'activity-initiative',
      },
      {
        title: 'Investments',
        icon: mdiAbacus,
        to: 'activity-Investments',
      },
      {
        title: 'Impact',
        icon: mdiViewCompactOutline,
        to: 'activity-impact',
      },
    ],
  },
]
