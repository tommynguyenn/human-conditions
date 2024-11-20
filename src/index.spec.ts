import { check } from '.';
import { OpenAI } from 'openai';

// Mock the OpenAI client to simulate API calls
jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => {
      return {
        completions: {
          create: jest.fn(),
        },
      };
    }),
  };
});

const mockedCreate = jest.fn();
const mockedOpenAI = new OpenAI({ apiKey: 'fake-api-key' });

describe('check function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when condition is met', async () => {
    mockedCreate.mockResolvedValueOnce({
      choices: [{ text: 'true' }],
    });

    mockedOpenAI.completions.create = mockedCreate;

    const result = await check('is user active', { userStatus: 'active' });

    expect(result).toBe(true);
    expect(mockedCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'o1Mini',
        prompt: expect.stringContaining('Condition: is user active'),
      })
    );
  });

  it('should return false when condition is not met', async () => {
    mockedCreate.mockResolvedValueOnce({
      choices: [{ text: 'false' }],
    });

    mockedOpenAI.completions.create = mockedCreate;

    const result = await check('is user active', { userStatus: 'inactive' });

    expect(result).toBe(false);
  });

  it('should throw an error if API key is not set', async () => {
    process.env.OPENAI_API_KEY = '';

    await expect(check('is user active', { userStatus: 'active' }))
      .rejects
      .toThrow('API key not set');
  });

  it('should throw an error if API call fails', async () => {
    mockedCreate.mockRejectedValueOnce(new Error('API error'));

    mockedOpenAI.completions.create = mockedCreate;

    await expect(check('is user active', { userStatus: 'active' }))
      .rejects
      .toThrow('Failed to evaluate condition');
  });
});
