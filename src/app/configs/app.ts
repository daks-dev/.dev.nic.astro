export interface AppConfig {
  id: string;
  scope: string;
  name: string;
  shortName: string;
  description: string;
  displayOverride: string[];
  display: string;
  backgroundColor: string;
  themeColor: string;
  tileColor: string;
}

const config: AppConfig = {
  id: '/',
  scope: '/',

  name: 'АО НИЦ «СЭ»',
  shortName: 'НИЦ «СЭ»',
  description: 'Независимая строительная экспертиза в Москве',

  displayOverride: ['fullscreen', 'minimal-ui'],
  display: 'standalone',
  backgroundColor: '#fafafa',
  themeColor: '#cbd5e1',
  tileColor: '#1e293b'
};

export default config;
