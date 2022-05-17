const ReportController = require("../../src/controllers/report.controller");
const { reportModel } = require('../../src/models/report.model');
jest.mock('../../src/models/report.model');

const baseReq = {
  session: {},
  body: {},
};

const fakeRes = {
  status: jest.fn().mockReturnValue({
    json: jest.fn(),
  }),
};

describe('ReportController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllReports', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should allow admins to access this resource', async () => {
      const fakeUser = {
        _id: '123',
        email: 'user@example.com',
        password: '123',
        roles: ['admin'],
      };

      const fakeReq = {
        session: {
          isAuthenticated: true,
          uid: fakeUser._id,
        },
      };

      reportModel.find.mockResolvedValue({});

      await ReportController.fetchAllReports(fakeReq, fakeRes);

      expect(fakeRes.status).toHaveBeenCalledWith(200);
      expect(fakeRes.status).toHaveBeenCalledTimes(1);
    });

    it('should send an error when an unauthorized user tries to access this resource', async () => {
      const fakeUser = {
        _id: '123',
        email: 'user@example.com',
        password: '123',
        roles: ['member'],
      };

      const fakeReq = {
        session: {
          isAuthenticated: true,
          uid: fakeUser._id,
        },
      };

      reportModel.find.mockResolvedValue({});

      await ReportController.fetchAllReports(fakeReq, fakeRes);

      expect(fakeRes.status).toHaveBeenCalledWith(403);
      expect(fakeRes.status).toHaveBeenCalledTimes(1);
    });

    it('should return an array of all logged reports', async () => {
      const fakeReports = [
        { postId: 123 },
        { postId: 456 },
        { postId: 789 },
      ];

      const fakeUser = {
        _id: 135,
        email: 'admin@example.com',
        password: '123',
        roles: ['admin'],
      };

      const fakeReq = {
        ...baseReq,
        session: {
          isAuthenticated: true,
        },
      };

      reportModel.find.mockResolvedValue(fakeReports);

      await ReportController.fetchAllReports(fakeReq, fakeRes);

      expect(fakeRes.status().json).toHaveBeenCalledWith({ reports: fakeReports });
      expect(fakeRes.status().json).toHaveBeenCalledTimes(1);
    });
  });

  describe('submitReport', () => {
    it('should send an ackknowledgment when the report is submitted successfully', async () => {
      const fakeReport = {
        postId: '123',
      };

      const fakeReq = {
        ...baseReq,
        body: {
          postId: fakeReport.postId,
        },
      };

      const reportModelMock = {
        save: jest.fn(),
      };
      reportModel.mockReturnValue(reportModelMock);
      reportModelMock.save.mockResolvedValue(true);

      await ReportController.submitReport(fakeReq, fakeRes);

      expect(fakeRes.status).toHaveBeenCalledWith(200);
      expect(fakeRes.status).toHaveBeenCalledTimes(1);
      expect(fakeRes.status().json).toHaveBeenCalledWith({ success: true, data: null });
      expect(fakeRes.status().json).toHaveBeenCalledTimes(1);
    });

    it('should send an error when postId is not a valid ObjectID', async () => {
      const fakeReq = {
        ...baseReq,
        body: {
          postId: '[123a]',
        },
      };

      await ReportController.submitReport(fakeReq, fakeRes);

      expect(fakeRes.status).toHaveBeenCalledWith(400);
      expect(fakeRes.status).toHaveBeenCalledTimes(1);
      expect(fakeRes.status().json.mock.calls[0][0].success).toEqual(false);
    });

    it('should save a report given a postId', async () => {
      const fakeReq = {
        ...baseReq,
        body: {
          postId: '123',
        },
      };

      const reportModelMock = {
        save: jest.fn(),
      };

      reportModel.mockReturnValue(reportModelMock);
      reportModelMock.save.mockResolvedValue(true);

      await ReportController.submitReport(fakeReq, fakeRes);

      expect(reportModel).toHaveBeenCalledWith({ postId: '123' });
      expect(reportModelMock.save).toHaveBeenCalledTimes(1);
    });
  });
});
