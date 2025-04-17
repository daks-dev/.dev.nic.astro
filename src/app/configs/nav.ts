import type { HTMLAttributes } from 'astro/types';
import type { NavItem } from '@daks.dev/astro.sdk';

type Item = Omit<HTMLAttributes<'a'>, 'class'> & NavItem;

interface NavSidebar {
  header?: Item[];
  body?: Item[];
  footer?: Item[];
}

interface NavSite {
  navbar: Item[];
  sidebar?: NavSidebar;
  footer?: Item[];
}

export const activity: Item[] = [
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

export const drawer: NavSidebar = {
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
      label: 'Политика конфиденциальности'
    }
  ]
};

export const nav: NavSite = {
  navbar: [
    {
      href: '/activity',
      label: 'Деятельность',
      items: activity
    },
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
      label: 'Контакты'
    }
  ],
  sidebar: drawer,
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
