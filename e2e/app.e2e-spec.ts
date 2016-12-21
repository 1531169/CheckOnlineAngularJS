import { CheckOnlineAngularJSPage } from './app.po';

describe('check-online-angular-js App', function() {
  let page: CheckOnlineAngularJSPage;

  beforeEach(() => {
    page = new CheckOnlineAngularJSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
