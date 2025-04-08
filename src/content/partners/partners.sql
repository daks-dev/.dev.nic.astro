PRAGMA foreign_keys = off;
BEGIN TRANSACTION;


DROP TABLE IF EXISTS partners;
CREATE TABLE partners (
  id           INTEGER  PRIMARY KEY NOT NULL,
  name         TEXT     NOT NULL,
  email        TEXT,
  telephone    TEXT,
  address      TEXT,
  url          TEXT,
  title        TEXT,
  description  TEXT,
  projects     INTEGER,
  /*
  latitude     REAL,
  longitude    REAL,
  */
  center       TEXT,
  zoom         REAL,
  priority     INTEGER,
  hidden       INTEGER
);

INSERT INTO partners ( id, name, email, telephone, address, url ) VALUES (
  1,
  'MR group',
  'info@mr-group.ru',
  '+7 (495) 514-15-14',
  '123112, г. Москва, 1-й Красногвардейский проезд, д. 22, стр. 1 (БЦ Neva Towers, башня Т1)',
  'mr-group.ru'
);

INSERT INTO partners ( id, name, email, telephone, address, url, center, zoom ) VALUES (
  2,
  'ОАО «ГПЗ-2 Тверь» ',
  'tver@2-gpz.ru',
  '+7 (4822) 79-66-61',
  '170100, Россия, Тверская область, г. Тверь, ул. Индустриальная, д. 11',
  '2-gpz.ru',
  '55.720379, 37.611452',
  17
);

INSERT INTO partners ( id, name, telephone, address, url, center, zoom ) VALUES (
  3,
  'ООО УК «Столица Менеджмент»',
  '+7 (495) 984-70-10',
  'г. Москва, ул Ленинская Слобода, д. 19 (БЦ “OMEGA PLAZA”, оф. 5.04)',
  'www.stmng.ru',
  '55.628180, 37.381341',
  13
);

INSERT INTO partners ( id, name, telephone, address, url, center, zoom ) VALUES (
  4,
  'ДОНСТРОЙ',
  '+7 (495) 925-47-47',
  '119590, г. Москва, ул. Мосфильмовская, д. 70',
  'donstroy.moscow',
  '55.773143, 37.547079',
  14
);

INSERT INTO partners ( id, name, telephone, address, url ) VALUES (
  5,
  'Первый ДСК',
  '+7 (495) 106-46-07',
  '119002, г. Москва, ул. Арбат, д. 10 (БЦ Midland Plaza, 3-тий этаж)',
  'www.dsk1.ru'
);

INSERT INTO partners ( id, name, telephone, address, url ) VALUES (
  6,
  'Группа компаний ФСК',
  '+7 (495) 106-46-07',
  '119002, г. Москва, ул. Арбат, д. 10 (БЦ Midland Plaza, 3-тий этаж)',
  'fsk.ru'
);

INSERT INTO partners ( id, name, telephone, address, url, center, zoom ) VALUES (
  7,
  'Seven Suns Development',
  '+7 (800) 777-20-20',
  '129110, г. Москва, Олимпийский проспект, д. 16, стр. 5 (БЦ Олимпик Холл)',
  'sevensuns.ru',
  '55.669562, 37.738611',
  17
);

INSERT INTO partners ( id, name, telephone, address, url, center, zoom ) VALUES (
  8,
  'Группа ПСН',
  '+7 (495) 132-16-72',
  '115114, г. Москва, Дербеневская наб., д. 7, стр. 10 (Деловой квартал «Новоспасский»)',
  'www.psngroup.ru',
  '55.560150, 37.577506',
  17
);

INSERT INTO partners ( id, name, telephone, address, url ) VALUES (
  9,
  'ГК «Инград»',
  '+7 (495) 500-00-04',
  '127006, г. Москва, ул. Краснопролетарская, д. 2, к. 4',
  'www.ingrad.ru'
);

INSERT INTO partners ( id, name, email, address, url, center, zoom, hidden ) VALUES (
  10,
  'Администрация ГО Клин',
  'klin@mosreg.ru',
  '141600, Московская область, г. Клин, ул. Карла Маркса, д. 68-А',
  'www.klincity.ru',
  '56.330705, 36.716416',
  15,
  1
);

INSERT INTO partners ( id, name, telephone, address, url, center, zoom, hidden ) VALUES (
  11,
  'АО «Стройсервисбыт»',
  '+7 (499) 244-07-84',
  '123290, г. Москва, Причальный пр-д., д. 2',
  'ssbyt.ru',
  '55.761055, 37.519631',
  17,
  1
);

/*
INSERT INTO partners ( id, name ) VALUES (
  ?,
  ''
);
*/

DROP INDEX IF EXISTS [partners.name];
CREATE UNIQUE INDEX [partners.name] ON partners (
    name ASC
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
