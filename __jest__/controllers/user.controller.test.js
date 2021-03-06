const req = require('express/lib/request');
const UserController = require('../../src/controllers/user.controller');

const { UserModel } = require('../../src/models/user.model');
jest.mock('../../src/models/user.model');

const baseReq = {
  session: {},
  body: {},
};

const statusMock = jest.fn();
const jsonMock = jest.fn();

const fakeRes = {
  status: statusMock.mockReturnValue({
    json: jsonMock,
  }),
};

describe('UserController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllAccounts', () => {
    it('should return a warning when a non-admin user attempts to access the endpoint', async () => {
      UserModel.findById.mockReturnValue({ roles: ['member'] });

      await UserController.fetchAllAccounts(baseReq, fakeRes);

      expect(jsonMock).toHaveBeenCalledWith({ success: false });
      expect(jsonMock).toHaveBeenCalledTimes(1);
      expect(statusMock).toHaveBeenCalledWith(403);
      expect(statusMock).toHaveBeenCalledTimes(1);
    });

    it('should return an array of all registered accounts', async () => {
      const fakeUser = {
        email: 'admin@example.com',
        password: '123',
        roles: ['admin'],
      };

      UserModel.findById.mockReturnValue({ roles: fakeUser.roles });
      UserModel.find.mockReturnValue([fakeUser]);

      await UserController.fetchAllAccounts(baseReq, fakeRes);

      expect(jsonMock).toHaveBeenCalledWith({ success: true, users: [fakeUser] });
      expect(jsonMock).toHaveBeenCalledTimes(1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(statusMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('register', () => {
    it('should create a new user given an email and password', async () => {
      const fakeReq = {
        ...baseReq,
        body: {
          email: 'user@example.com',
          password: '123',
        },
      };

      await UserController.register(fakeReq, fakeRes);

      expect(UserModel).toHaveBeenCalledTimes(1);
      expect(UserModel.mock.calls[0][0].email).toEqual(fakeReq.body.email);
      expect(UserModel.mock.calls[0][0].password).toEqual(fakeReq.body.password);
    });

    it('should send an error when an email or password is empty', async () => {
      const fakeReq = {
        ...baseReq,
        body: {
          email: '',
          password: '',
        },
      };

      await UserController.register(fakeReq, fakeRes);

      expect(jsonMock.mock.calls[0][0].status).toBe(false);
      expect(jsonMock).toHaveBeenCalledTimes(1);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock).toHaveBeenCalledTimes(1);
    });

    it('should set the role of the new user to member', async () => {
      const fakeReq = {
        ...baseReq,
        body: {
          email: 'user@example.com',
          password: '123',
        },
      };

      await UserController.register(fakeReq, fakeRes);

      expect(jsonMock.mock.calls[0][0].roles).toStrictEqual(['member']);
      expect(jsonMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('login', () => {
    it('should send an acknowledgment when the user is successfully authenticated', async () => {
      const fakeUser = {
        email: 'user@example.com',
        password: '123',
      };

      UserModel.find.mockResolvedValue([fakeUser]);

      const fakeReq = {
        ...baseReq,
        body: fakeUser,
      };

      await UserController.login(fakeReq, fakeRes);

      expect(jsonMock.mock.calls[0][0].success).toEqual(true);
      expect(jsonMock).toHaveBeenCalledTimes(1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(statusMock).toHaveBeenCalledTimes(1);
    });

    it('should update a user\'s session when the user is successfully authenticated', async () => {
      const fakeUser = {
        _id: '123',
        email: 'user@example.com',
        password: '123',
      };

      UserModel.find.mockResolvedValue([fakeUser]);

      const fakeReq = {
        ...baseReq,
        body: fakeUser,
      };

      await UserController.login(fakeReq, fakeRes);

      expect(fakeReq.session.isAuthenticated).toEqual(true);
      expect(fakeReq.session.uid).toEqual(fakeUser._id);
    });

    it('should send an error when the user fails to authenticate themselves', async () => {
      const fakeUser = {
        email: 'user@example.com',
        password: '123',
      };

      UserModel.find.mockResolvedValue([{
        ...fakeUser,
        password: '456',
      }]);

      const fakeReq = {
        ...baseReq,
        body: fakeUser,
      };

      await UserController.login(fakeReq, fakeRes);

      expect(jsonMock.mock.calls[0][0].success).toEqual(false);
      expect(jsonMock).toHaveBeenCalledTimes(1);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('logout', () => {
    it('should update a user\'s session when the user successfully logs out', () => {
      UserController.logout(baseReq, fakeRes);

      expect(baseReq.session.isAuthenticated).toEqual(false);
      expect(baseReq.session.uid).toEqual(null);
    });

    it('should send an acknowledgment when the user successfully logs out', () => {
      UserController.logout(baseReq, fakeRes);

      expect(jsonMock.mock.calls[0][0].success).toEqual(true);
      expect(jsonMock).toHaveBeenCalledTimes(1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(statusMock).toHaveBeenCalledTimes(1);
    });

    it('should send an error when a visitor tries to log out', () => {
      const fakeReq = {
        ...baseReq,
        session: {
          isAuthenticated: false,
        },
      };

      UserController.logout(fakeReq, fakeRes);

      expect(jsonMock.mock.calls[0][0].success).toEqual(false);
      expect(jsonMock).toHaveBeenCalledTimes(1);
      expect(statusMock).toHaveBeenCalledWith(403);
      expect(statusMock).toHaveBeenCalledTimes(1);
    });
  });
});
