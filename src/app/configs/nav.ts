import type { NavItem } from '@lib/components/astro';

interface NavSidebar {
  header?: NavItem[];
  body?: NavItem[];
  footer?: NavItem[];
}

interface NavSite {
  navbar: NavItem[];
  sidebar?: NavSidebar;
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
        label: 'Электропрогрев'
      },
      {
        href: '/field-tests',
        label: 'Натурные испытания'
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

export const draver: NavSidebar = {
  header: [
    {
      href: '/about',
      label: 'О предприятии'
    },
    {
      href: '/partners',
      label: 'Партнёры'
    },
    {
      href: '/feedback',
      label: 'Отзывы'
    }
  ],
  body: activity,
  footer: [
    {
      href: '/articles',
      label: 'Инфрмация'
    },
    {
      href: '/privacy',
      label: 'Политика конфиденциальности'
    }
  ]
};

export const nav: NavSite = {
  navbar: [
    {
      href: '/regulation',
      label: 'Регламент',
      rel: 'help'
    },
    {
      href: '/activity',
      label: 'Деятельность',
      items: activity
    },
    {
      href: '/projects',
      label: 'Проекты'
    },
    {
      href: '/permissions',
      label: 'Допуски'
    },
    {
      href: '/partners',
      label: 'Партнёры',
      class: 'bp:max-xl:hidden'
    },
    {
      href: '/feedback',
      label: 'Отзывы',
      class: 'bp:max-lg:hidden'
    },
    {
      href: '/articles',
      label: 'Инфрмация',
      class: 'bp:max-2xl:hidden'
    },
    {
      href: '/news',
      label: 'Новости',
      class: 'bp:max-xl:hidden'
    },
    {
      href: '/contacts',
      label: 'Контакты'
    }
  ],
  sidebar: draver,
  footer: [
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
  ]
};
