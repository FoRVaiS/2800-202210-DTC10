const HomeController = require("../../src/controllers/home.controller");

const baseReq = {
  session: {},
  body: {},
};

const fakeRes = {
  redirect: jest.fn(),
  render: jest.fn(),
};

describe('HomeController', () => {
  describe('renderHomePage', () => {
    it('should render the page given the user is authenticated', () => {
      const fakeReq = {
        ...baseReq,
        session: {
          isAuthenticated: true,
        },
      };

      HomeController.renderHomePage(fakeReq, fakeRes);

      expect(fakeRes.render).toHaveBeenCalledTimes(1);
    });

    it('should redirect when the user is a visitor', () => {
      const fakeReq = {
        ...baseReq,
        session: {
          isAuthenticated: false,
        },
      };

      HomeController.renderHomePage(fakeReq, fakeRes);

      expect(fakeRes.redirect).toHaveBeenCalledTimes(1);
    });
  });
});