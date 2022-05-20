const UserController = require('../../src/controllers/user.controller');

const { createSuccessPayload } = require('../../src/utils/createSuccessPayload');
jest.mock('../../src/utils/createSuccessPayload');

const { createErrorPayload } = require('../../src/utils/createErrorPayload');
jest.mock('../../src/utils/createErrorPayload');

const { UserModel } = require('../../src/models/user.model');
jest.mock('../../src/models/user.model');

const baseReq = {
  session: {},
  body: {},
};

const statusMock = jest.fn();
const jsonMock = jest.fn()

const fakeRes = {
  status: statusMock.mockReturnValue({
    json: jsonMock,
  }),
};

describe('UserController', () => {
  describe('fetchAllAccounts', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return a warning when a non-admin user attempts to access the endpoint', async () => {
      UserModel.findById.mockReturnValue({ roles: [ 'member' ] });
      
      await UserController.fetchAllAccounts(baseReq, fakeRes);

      expect(createErrorPayload).toHaveBeenCalledWith('User must be an admin to access this resource.');
      expect(createErrorPayload).toHaveBeenCalledTimes(1);
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
      UserModel.find.mockReturnValue([ fakeUser ]);

      await UserController.fetchAllAccounts(baseReq, fakeRes);

      expect(createSuccessPayload).toHaveBeenCalledWith([fakeUser]);
      expect(createSuccessPayload).toHaveBeenCalledTimes(1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(statusMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('register', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

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

    it('should send an error when an email is empty', async () => {
      const fakeReq = {
        ...baseReq,
        body: {
          email: '',
          password: '123',
        },
      };

      await UserController.register(fakeReq, fakeRes);

      expect(createErrorPayload).toHaveBeenCalledWith('The field \'email\' is required to be a string');
      expect(createErrorPayload).toHaveBeenCalledTimes(1);
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

      expect(createSuccessPayload.mock.calls[0][0].roles).toStrictEqual(['member']);
      expect(createSuccessPayload).toHaveBeenCalledTimes(1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(statusMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('login', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should send an acknowledgment when the user is successfully authenticated', async () => {
      const fakeUser = {
        email: 'user@example.com',
        password: '123',
      }

      UserModel.find.mockResolvedValue([fakeUser]);

      const fakeReq = {
        ...baseReq,
        body: fakeUser,
      };

      await UserController.login(fakeReq, fakeRes);

      expect(jsonMock.mock.calls[0][0]).toEqual(true);
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
