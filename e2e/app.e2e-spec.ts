import { RezepteAppPage } from './app.po';

describe('rezepte-app App', () => {
  let page: RezepteAppPage;

  beforeEach(() => {
    page = new RezepteAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
