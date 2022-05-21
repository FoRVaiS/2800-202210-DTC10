const SalaryController = require('../../src/controllers/salary.controller');
jest.mock('../../src/controllers/salary.controller', () => ({
  ...jest.requireActual('../../src/controllers/salary.controller'),
}));

const { CompanyModel } = require('../../src/models/company.model');
jest.mock('../../src/models/company.model');

const statusMock = jest.fn();
const jsonMock = jest.fn()

const fakeRes = {
  status: statusMock.mockReturnValue({
    json: jsonMock,
  }),
};

const fakeData = [{
  name: 'McDonald\'s',
  locations: [
    {
      name: '555 E Street',
      salaries: [
        {
          userId: 'U456',
          position: 'Sales Associate',
          salary: 16.14,
        },
        {
          userId: 'U123',
          position: 'Sales Associate',
          salary: 18.12,
        },
      ],
    }
  ],
}];

const fakeProcessedData = [
  { company: 'McDonald\'s', location: '555 E Street', position: 'Sales Associate', userId: 'U456', salary: 16.14 },
  { company: 'McDonald\'s', location: '555 E Street', position: 'Sales Associate', userId: 'U123', salary: 18.12 },
];

describe('SalaryController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('submitSalary', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return a successful response given a company, location, position, and salary', async () => {
      const fakeReq = {
        session: {
          uid: '123',
        },
        body: {
          company: 'McDonald\'s',
          salary: 16.14,
          position: 'Sales Associate',
          location: '555 E Street',
        },
      };
  
      CompanyModel.find.mockResolvedValue([]);

      // SalaryController.doesCompanyExist.mockResolvedValue(false);
      CompanyModel.create.mockResolvedValue(true);
      await SalaryController.submitSalary(fakeReq, fakeRes);
  
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(statusMock).toHaveBeenCalledTimes(1);
      expect(jsonMock).toHaveBeenCalledWith({ success: true, data: null });
      expect(jsonMock).toHaveBeenCalledTimes(1);
    });

    it('should save the user salary submission data to the database ', async () => {
      const fakeReq = {
        session: {
          uid: '123',
        },
        body: {
          company: 'McDonald\'s',
          salary: 16.14,
          position: 'Sales Associate',
          location: '555 E Street',
        },
      };
  
      CompanyModel.create.mockResolvedValue(true);
      await SalaryController.submitSalary(fakeReq, fakeRes);
  
      expect(CompanyModel.create).toHaveBeenCalledWith({
        name: 'McDonald\'s',
        locations: [
          {
            name: '555 E Street',
            salaries: [
              {
                userId: '123',
                position: 'Sales Associate',
                salary: 16.14
              }
            ]
          }
        ]
      });
      expect(CompanyModel.create).toHaveBeenCalledTimes(1);
    });

    it('should send an error when the company field is missing', async () => {
      const fakeReq = {
        body: {
          salary: 16.14,
          position: 'Sales Associate',
          location: '555 E Street',
        },
      };
  
      await SalaryController.submitSalary(fakeReq, fakeRes);
  
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock).toHaveBeenCalledTimes(1);
      expect(jsonMock.mock.calls[0][0].success).toEqual(false);
      expect(jsonMock).toHaveBeenCalledTimes(1);
    });

    it('should send an error when the salary field is missing', async () => {
      const fakeReq = {
        body: {
          company: 'McDonald\'s',
          position: 'Sales Associate',
          location: '555 E Street',
        },
      };
  
      await SalaryController.submitSalary(fakeReq, fakeRes);
  
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock).toHaveBeenCalledTimes(1);
      expect(jsonMock.mock.calls[0][0].success).toEqual(false);
      expect(jsonMock).toHaveBeenCalledTimes(1);
    });

    it('should send an error when the position field is missing', async () => {
      const fakeReq = {
        body: {
          company: 'McDonald\'s',
          salary: 16.14,
          location: '555 E Street',
        },
      };
  
      await SalaryController.submitSalary(fakeReq, fakeRes);
  
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock).toHaveBeenCalledTimes(1);
      expect(jsonMock.mock.calls[0][0].success).toEqual(false);
      expect(jsonMock).toHaveBeenCalledTimes(1);
    });

    it('should send an error when the location field is missing', async () => {
      const fakeReq = {
        body: {
          company: 'McDonald\'s',
          salary: 16.14,
          location: '555 E Street',
        },
      };
  
      await SalaryController.submitSalary(fakeReq, fakeRes);
  
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock).toHaveBeenCalledTimes(1);
      expect(jsonMock.mock.calls[0][0].success).toEqual(false);
      expect(jsonMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchSalaryFromLocation', () => {
    // BUG: This test needs work because it assumes the query is working as intended.
    it('should only return salaries based on a given job position from a single location', async () => {
      const fakeReq = {
        params: {
          location: '555 E Street',
          position: 'Sales Associate',
        },
      };

      CompanyModel.find.mockResolvedValue(fakeData);
      await SalaryController.fetchSalaryFromLocation(fakeReq, fakeRes);

      const searchQuery = {
        locations: {
          $elemMatch: [{
            name: '555 E Street',
          }],
        },
      };

      expect(CompanyModel.find).toHaveBeenCalledWith(searchQuery, { __v: 0 });
      expect(CompanyModel.find).toHaveBeenCalledTimes(1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(statusMock).toHaveBeenCalledTimes(1);
      expect(jsonMock).toHaveBeenCalledWith({ success: true, data: fakeProcessedData });
      expect(jsonMock).toHaveBeenCalledTimes(1);
    });

    it('should send an error when the location parameter is missing', async () => {
      const fakeReq = {
        params: {
          position: 'Sales Associate',
        },
      };

      await SalaryController.fetchSalaryFromLocation(fakeReq, fakeRes);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock).toHaveBeenCalledTimes(1);
      expect(jsonMock.mock.calls[0][0].success).toEqual(false);
      expect(jsonMock).toHaveBeenCalledTimes(1);
    });

    it('should send an error when the position parameter is missing', async () => {
      const fakeReq = {
        params: {
          location: '555 E Street',
        },
      };

      await SalaryController.fetchSalaryFromLocation(fakeReq, fakeRes);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(statusMock).toHaveBeenCalledTimes(1);
      expect(jsonMock.mock.calls[0][0].success).toEqual(false);
      expect(jsonMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchAllSalaries', () => {
    it('should return a list of all salaries in a condensed format', async () => {
      CompanyModel.find.mockResolvedValue(fakeData);
      await SalaryController.fetchAllSalaries({}, fakeRes);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(statusMock).toHaveBeenCalledTimes(1);
      expect(jsonMock).toHaveBeenCalledWith({ success: true, data: fakeProcessedData });
      expect(jsonMock).toHaveBeenCalledTimes(1);
    });
  });
});
