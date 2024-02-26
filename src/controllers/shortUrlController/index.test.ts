import {
  consumerClassValidator,
  minCustomerConsumptionValidator,
  tariffModalityValidator,
} from 'src/validators';
import analyzeCustomerController from '.';
import {
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE,
  SUCCESS_HTTP_RESPONSE,
} from 'src/utils/http';

jest.mock('src/utils/http');
jest.mock('src/validators', () => ({
  consumerClassValidator: {
    setNext: jest.fn(() => consumerClassValidator),
    validate: jest.fn(),
  },
  minCustomerConsumptionValidator: {
    setNext: jest.fn(() => minCustomerConsumptionValidator),
    validate: jest.fn(),
  },
  tariffModalityValidator: {
    setNext: jest.fn(() => tariffModalityValidator),
    validate: jest.fn(),
  },
}));

jest.mock('./utils', () => ({
  calculateCO2Economy: jest.fn(),
}));

describe('analyzeCustomerController', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnValue({
        json: jest.fn(),
      }),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return HTTP 200 with correct data when validations succeed', async () => {
    (consumerClassValidator.validate as jest.Mock).mockReturnValue({
      ok: true,
    });

    const economy = 123.45;
    require('./utils').calculateCO2Economy.mockReturnValue(economy);

    await analyzeCustomerController(req, res);

    expect(SUCCESS_HTTP_RESPONSE).toHaveBeenCalledWith(res, {
      elegivel: true,
      economiaAnualDeCO2: '123.45',
    });
  });

  it('should return HTTP 500 when an internal error occurs', async () => {
    (consumerClassValidator.validate as jest.Mock).mockImplementation(() => {
      throw new Error('Validation Error');
    });

    await analyzeCustomerController(req, res);

    expect(INTERNAL_SERVER_ERROR_HTTP_RESPONSE).toHaveBeenCalledWith(res);
  });
});
