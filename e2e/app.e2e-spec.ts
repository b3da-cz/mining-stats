import { MiningStatsPage } from './app.po';

describe('mining-stats App', () => {
  let page: MiningStatsPage;

  beforeEach(() => {
    page = new MiningStatsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
