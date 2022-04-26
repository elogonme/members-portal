import { mdiCashRefund, mdiChatQuestion, mdiEmailOutline, mdiMessageTextOutline } from '@mdi/js'

export default [
  {
    title: 'About Us',
    icon: mdiChatQuestion,
    children: [
      {
        title: 'Fund',
        icon: mdiCashRefund,
        to: 'about-fund',
      },
      {
        title: 'Governance',
        icon: mdiMessageTextOutline,
        to: 'about-governance',
      },
      {
        title: 'Leadership',
        icon: mdiEmailOutline,
        to: 'about-leadership',
      },
    ],
  },
]
