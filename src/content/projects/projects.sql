PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
  id           INTEGER  NOT NULL  PRIMARY KEY,
  name         TEXT     NOT NULL,
  address      TEXT     NOT NULL,
  area         INTEGER,
  area_term    TEXT,
  area_unit    TEXT,
  units        INTEGER,
  units_term   TEXT,
  scope        TEXT,
  scope_term   TEXT,
  activities   TEXT,
  /*
  latitude     REAL,
  longitude    REAL,
  zoom         REAL,
  */
  location     TEXT     NOT NULL,
  note         TEXT,
  title        TEXT,
  description  TEXT,
  customer     INTEGER  REFERENCES partners (id) ON DELETE SET NULL,
  priority     INTEGER,
  hidden       INTEGER

);

/*
INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  1,
  'ЖК «City Bay»',
  'г. Москва, Волоколамское шоссе, д. 95-97',
  123196,
  8,
  '11-52',
  'технический надзор',
  '55.830566, 37.401680',
  1 /* MR group */
);

INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  2,
  'ЖК «Метрополия»',
  'г. Москва, Волгоградский проспект, 32',
  398916,
  12,
  '4-30',
  'технический надзор',
  '55.721045, 37.691570',
  1 /* MR group */
);

INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  3,
  'ЖК «Discovery»',
  'г. Москва, ул. Дыбенко, 7/1',
  123169,
  5,
  '31',
  'технический надзор',
  '55.878918, 37.479139',
  1 /* MR group */
);

INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  4,
  'ЖК «Водный»',
  'г. Москва, Головинское шоссе, 5',
  359500 ,
  6,
  '26-29',
  'технический надзор',
  '55.841178, 37.494277',
  1 /* MR group */
);

INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  5,
  'ЖК «Эко Видное»',
  'МО, Ленинский район, д. Сапроново',
  358000,
  13,
  '10-17',
  'технический надзор',
  '55.536466, 37.724581',
  1 /* MR group */
);

INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  6,
  'ЖК «Эко Видное 2.0»',
  'МО, Ленинский район, д. Ермолино',
  228000,
  5,
  '10-17',
  'технический надзор',
  '55.530962, 37.723323',
  1 /* MR group */
);

INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  7,
  'ЖК «Фили Град»',
  'г. Москва, Береговой проезд, 5',
  191295 ,
  7,
  '25',
  'технический надзор',
  '55.755608, 37.509196',
  1 /* MR group */
);

INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  8,
  'ЖК «Фили Сити»',
  'г. Москва, Багратионовский проезд, 5',
  127000 ,
  3,
  '6-42',
  'технический надзор',
  '55.743538, 37.510089',
  1 /* MR group */
);

INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  9,
  'ЖК «Савеловский city»',
  'г. Москва, ул. Складочная, вл. 1',
  84871 ,
  2,
  '19',
  'технический надзор',
  '55.805243, 37.590652',
  1 /* MR group */
);

INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  10,
  'ЖК «PerovSky»',
  'г. Москва, шоссе Энтузиастов, 88',
  50824,
  3,
  '23',
  'технический надзор',
  '55.764122, 37.798535',
  1 /* MR group */
);

INSERT INTO projects ( id, name, address, area, units, scope, location, customer ) VALUES (
  11,
  'ЖК «Гринада»',
  'г. Москва, ул. Феодосийская, вл. 1/9',
  65937,
  2,
  '39-19',
  '55.560150, 37.577506',
  8 /* PSN group */
);

INSERT INTO projects ( id, name, address, area, units, scope, location, customer ) VALUES (
  12,
  'Жилой дом',
  'МО г. Клин, ул. Менделеева, д.7',
  16692 ,
  1,
  '10',
  '56.330705, 36.716416',
  10 /* Администрация городского округа Клин */
);

INSERT INTO projects ( id, name, address, area, units, scope, location, customer ) VALUES (
  13,
  'ЖК «Сердце Столицы»',
  'г. Москва, ул. Шеногина , вл.1',
  219432,
  3,
  '19-37',
  '55.763039, 37.512757',
  4 /* Донстрой */
);

INSERT INTO projects ( id, name, address, area, units, scope, location, customer ) VALUES (
  14,
  'ЖК «Суббота»',
  'г. Москва, САО, ул. Верхняя, вл. 34',
  101000,
  1,
  '1-24',
  '55.779460, 37.573776',
  4 /* Донстрой */
);

INSERT INTO projects ( id, name, address, area, units, scope, location, customer ) VALUES (
  15,
  'ЖК «Станция Л»',
  'г. Москва, ул. Люблинская , вл. 72',
  9884,
  2,
  '1-25',
  '55.669561, 37.738587',
  7 /* Seven Suns */
);

INSERT INTO projects ( id, name, address, area, units, scope, scope_term, location, customer ) VALUES (
  16,
  'Многофункциональный ЖК',
  'г. Москва, ул. Шаболовка, д. 31',
  150000,
  2,
  '135 м',
  'Высотность',
  '55.720205, 37.611039',
  2 /* GPZ */
);

INSERT INTO projects ( id, name, address, area, units, scope, location, customer ) VALUES (
  17,
  'Деловой центр',
  'г. Москва, ул. Шаболовка, д. 31',
  11571,
  3,
  '9-16',
  '55.720223, 37.611039',
  2 /* GPZ */
);

INSERT INTO projects ( id, name, address, area, units, scope, location, customer ) VALUES (
  18,
  'ТРЦ «Столица»',
  'МО, г. Московский, ул. Никитина 2',
  16691,
  1,
  '4',
  '55.604555, 37.356659',
  3 /* Столица */
);

INSERT INTO projects ( id, name, address, area, units, scope, location, customer ) VALUES (
  19,
  'Бизнес центр «Якорь»',
  'г. Москва, СЗАО, район Хорошево Мневники. Причальный пр. вл.2',
  10000,
  1,
  '6',
  '55.761055, 37.519631',
  11 /* Стройсервисбыт */
);

INSERT INTO projects ( id, name, address, area, units, scope, location, customer ) VALUES (
  20,
  'ТРЦ «Небо»',
  'г. Москва, ул. Авиаторов, вл. 5',
  62445,
  1,
  '4',
  '55.643184, 37.398304',
  3 /* Столица */
);
*/
INSERT INTO projects ( id, name, address, area, area_term, area_unit, units, activities, location ) VALUES (
  21,
  'ФГБУ НМИЦ Кардиологии',
  'г. Москва, ул. 3-я Черепковская , 15А',
  44,
  'Протяженность',
  'км',
  1,
  'реконструкция инженерных сетей',
  '55.756512, 37.377227'
);

INSERT INTO projects ( id, name, address, area, location ) VALUES (
  22,
  'Храм Илии Пророка',
  'г. Москва, ул. Ленинградское шоссе, 39',
  1375.14,
  '55.835426, 37.483602'
);

INSERT INTO projects ( id, name, address, area, location ) VALUES (
  23,
  'Храм Воскресения Словущего',
  'г. Москва, пересечение улиц Белореченской и Перерва',
  1450.88,
  '55.666835, 37.768476'
);

INSERT INTO projects ( id, name, address, area, location ) VALUES (
  24,
  'Храм Спиридона Тримифунского Чудотворца',
  'г. Москва, ул. Большая Академическая, д.33',
  2795.14,
  '55.830469, 37.530116'
);

INSERT INTO projects ( id, name, address, area, location ) VALUES (
  25,
  'Храм Двенадцати апостолов',
  'Москва, ул. Клинская, вл.12-14',
  935,
  '55.869493, 37.494665'
);

INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  26,
  'ЖК «Оливковый дом»',
  'г. Москва, ул. Верхняя, 34',
  7270,
  1,
  '7-9 м.',
  'корректировка проектной документации',
  '55.779151, 37.575597',
  4 /* Донстрой */
);

INSERT INTO projects ( id, name, address, area, units, scope, location, customer ) VALUES (
  27,
  'Центр интерьеров «The Dom»',
  'г. Москва, ул. Шеногина , вл.1',
  219432,
  3,
  '19-37',
  '55.763039, 37.512714',
  4 /* Донстрой */
);

INSERT INTO projects ( id, name, address, area, scope, scope_term, activities, location ) VALUES (
  28,
  'Центральный стадион',
  'г. Москва, ул. Ленинградский проспект, 36',
  210000,
  '11 488-14 000 мест, в зависимости от конфигурации хоккейной, баскетбольной, концертной',
  'Вместимость',
  'конструктивные решения',
  '55.791374, 37.560160'
);

INSERT INTO projects ( id, name, address, area, scope, scope_term, activities, location ) VALUES (
  29,
  'Стадион г. Нижний Новгород',
  'г. Нижний Новгород, ул. Должанская, 2А, к. 1',
  127500,
  '45 000 мест',
  'Вместимость',
  'корректировка проектной и рабочей документации, архитектурные решения, ПОС, ПЗУ',
  '56.337697, 43.963348'
);

INSERT INTO projects ( id, name, address, area, units, scope, location ) VALUES (
  30,
  'Корпус информационных технологий РЭУ им. Г.В. Плеханова',
  'г. Москва, ул. Б. Серпуховская, вл. 13, стр. 1',
  3096,
  1,
  '11',
  '55.727361, 37.626103'
);

INSERT INTO projects ( id, address, name, activities, location, note ) VALUES (
  31,
  '',
  'Боровское шоссе',
  'разработка проектной и рабочей документации инженерных сетей',
  '55.615678, 37.265125',
  'Проектные работы по реконструкции автодороги от Минского шоссе до Боровского шоссе (Внуковское шоссе).'
);

INSERT INTO projects ( id, name, address, activities, location ) VALUES (
  32,
  'Жилой дом на ул. П. Романова',
  'г. Москва, ул. П. Романова, д.10',
  'разработка проектной и рабочей документации',
  '55.706658, 37.682226'
);

INSERT INTO projects ( id, name, address, activities, location ) VALUES (
  33,
  'Жилой дом на проезде Черепановых',
  'Москва, проезд Черепановых, д. 54 А',
  'разработка проектной и рабочей документации, выполнение функций технического заказчика на этапе проектирования',
  '55.842937, 37.538127'
);

INSERT INTO projects ( id, name, address, activities, location ) VALUES (
  34,
  'ТРЦ «Небо»',
  'г. Москва, ул. Авиаторов, владение 7А, к.2',
  'разработка проектной и рабочей документации',
  '55.641924, 37.402359'
);

INSERT INTO projects ( id, name, address, activities, location ) VALUES (
  35,
  'Детский сад в пос. Мосрентген, кв. 24',
  'г. Москва, поселение Мосрентген, кв. 24, влд. 3',
  'разработка проектной и рабочей документации',
  '55.621774, 37.474087'
);

INSERT INTO projects ( id, name, address, activities, location ) VALUES (
  36,
  'Детский сад в пос. Мосрентген, кв. 23',
  'г. Москва, поселение Мосрентген, кв. 23, влд.1',
  'разработка проектной и рабочей документации',
  '55.621761, 37.474065'
);

INSERT INTO projects ( id, name, address, activities, location ) VALUES (
  37,
  'Блок начальных классов ГБОУ «Школа № 1391»',
  'г. Москва, поселение Киевский',
  'разработка проектной и рабочей документации',
  '55.429564, 36.869764'
);

INSERT INTO projects ( id, name, address, activities, location ) VALUES (
  38,
  'Блок начальных классов ГБОУ «Школа № 1392»',
  'Москва, Новомосковский административный округ, поселение Филимоновское , поселок Марьино, 2',
  'проектные работы при строительстве объекта',
  '55.549548, 37.323732'
);

INSERT INTO projects ( id, name, address, area, scope, activities, location ) VALUES (
  39,
  'Клубный дом «Негоциант»',
  'г. Москва, ул. Б. Якиманка, вл.24',
  3846,
  '4-6 м.',
  'разработка архитектурной концепции, разработка проектной и рабочей документации',
  '55.740755, 37.613377'
);

/*
INSERT INTO projects ( id, name, address, area, units, scope, activities, location, customer ) VALUES (
  ?,
  '',
  '',
  0,
  0,
  '',
  '',
  '',
  0
);
*/

DROP INDEX IF EXISTS [projects.name];
CREATE UNIQUE INDEX [projects.name] ON projects (
  name ASC,
  address ASC
);

DROP INDEX IF EXISTS [projects.priority];
CREATE INDEX [projects.priority] ON projects (
  priority DESC,
  name ASC,
  address ASC
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
