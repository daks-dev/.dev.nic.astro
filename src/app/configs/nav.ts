import type { NavItem } from '@daks.dev/astro.sdk';

interface NavSidebar {
  header?: NavItem[];
  body?: NavItem[];
  footer?: NavItem[];
}

export const activity: NavItem[] = [
  {
    href: '/inspection',
    label: 'Обследование зданий и сооружений'
  },
  {
    href: '/technical-supervision',
    label: 'Технический надзор'
  },
  {
    href: '/laboratory-control',
    label: 'Лабораторный контроль',
    items: [
      {
        href: '/electric-heating',
        label: 'Электропрогрев',
        'data-astro-prefetch': 'hover'
      },
      {
        href: '/field-tests',
        label: 'Натурные испытания',
        'data-astro-prefetch': 'hover'
      }
    ]
  },
  {
    href: '/geodesy-monitoring',
    label: 'Геодезия и мониторинг'
  },
  {
    href: '/forensic-examination',
    label: 'Судебная экспертиза'
  },
  {
    href: '/energy-audit',
    label: 'Энергоаудит'
  },
  {
    href: '/certification-accreditation',
    label: 'Сертификация и аккредитация'
  }
];

export const navbar: NavItem[] = [
  {
    href: '/activity',
    label: 'Деятельность',
    'data-astro-prefetch': '',
    items: activity
  },
  {
    href: '/regulation',
    label: 'Регламент',
    'data-astro-prefetch': 'hover',
    rel: 'help'
  },
  {
    href: '/projects',
    label: 'Проекты',
    'data-astro-prefetch': ''
  },
  {
    href: '/permissions',
    label: 'Допуски',
    class: 'bp:max-lg:hidden',
    'data-astro-prefetch': ''
  },
  {
    href: '/partners',
    label: 'Партнёры',
    'data-astro-prefetch': ''
  },
  {
    href: '/feedbacks',
    label: 'Отзывы',
    class: 'bp:max-xl:hidden',
    'data-astro-prefetch': ''
  },
  {
    href: '/articles',
    label: 'Инфрмация',
    class: 'bp:max-2xl:hidden',
    'data-astro-prefetch': ''
  },
  {
    href: '/news',
    label: 'Новости',
    'data-astro-prefetch': '',
    class: 'bp:max-xl:hidden'
  },
  {
    href: '/contacts',
    label: 'Контакты',
    'data-astro-prefetch': ''
  }
];

export const sidebar: NavSidebar = {
  header: [
    {
      href: '/about',
      label: 'О предприятии',
      'data-astro-prefetch': 'hover'
    },
    {
      href: '/contacts',
      label: 'Контакты'
    }
  ],
  body: activity,
  footer: [
    {
      href: '/regulation',
      label: 'Регламент',
      rel: 'help'
    },
    {
      href: '/projects',
      label: 'Проекты'
    },
    {
      href: '/permissions',
      label: 'Допуски',
      class: 'bp:max-lg:hidden'
    },
    {
      href: '/partners',
      label: 'Партнёры'
    },
    {
      href: '/feedbacks',
      label: 'Отзывы'
    },
    {
      href: '/articles',
      label: 'Инфрмация'
    },
    {
      href: '/news',
      label: 'Новости'
    },
    {
      href: '/privacy',
      label: 'Политика конфиденциальности',
      'data-astro-prefetch': 'hover'
    }
  ]
};

export const footer: NavItem[] = [
  {
    href: '/admin',
    label: 'ic:outline-settings' // &#128736;
  },
  {
    href: '/regulation',
    label: 'Регламент'
  },
  {
    href: '/permissions',
    label: 'Допуски'
  },
  {
    href: '/contacts',
    label: 'Контакты'
  }
];

export default {
  navbar,
  sidebar,
  footer
};
