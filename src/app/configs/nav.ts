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

export const navbar: NavItem[] = [
  {
    href: '/activity',
    label: 'Деятельность',
    items: activity
    // 'data-astro-prefetch': ''
  },
  {
    href: '/regulation',
    label: 'Регламент',
    rel: 'help'
  },
  {
    href: '/permissions',
    label: 'Допуски'
  },
  {
    href: '/projects',
    label: 'Проекты'
  },
  {
    href: '/partners',
    label: 'Партнёры',
    class: 'bp:max-lg:hidden'
  },
  {
    href: '/feedbacks',
    label: 'Отзывы',
    class: 'bp:max-xl:hidden'
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
    label: 'Контакты',
    'data-astro-prefetch': ''
  }
];

export const sidebar: NavSidebar = {
  header: [
    {
      href: '/about',
      label: 'О предприятии'
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
      href: '/permissions',
      label: 'Допуски',
      class: 'bp:max-lg:hidden'
    },
    {
      href: '/projects',
      label: 'Проекты'
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
      label: 'Политика конфиденциальности'
    }
  ]
};

export const footer: NavItem[] = [
  {
    href: '/regulation',
    label: 'Регламент',
    rel: 'help',
    class: 'bp:hidden'
  },
  {
    href: '/permissions',
    label: 'Допуски',
    class: 'bp:hidden'
  },
  {
    href: '/partners',
    label: 'Партнёры',
    class: 'max-bp:hidden lg:hidden'
  },
  {
    href: '/feedbacks',
    label: 'Отзывы',
    class: 'max-bp:hidden xl:hidden'
  },
  {
    href: '/articles',
    label: 'Инфрмация',
    class: 'max-bp:hidden 2xl:hidden'
  },
  {
    href: '/news',
    label: 'Новости',
    class: 'max-bp:hidden xl:hidden'
  },
  {
    href: '/contacts',
    label: 'Контакты',
    class: 'bp:hidden'
  }
  /*
  {
    href: '/privacy',
    label: 'Политика конфиденциальности'
  }
  */
];

export default {
  navbar,
  sidebar,
  footer
};
