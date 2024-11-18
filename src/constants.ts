const LOG_SIGNATURE = '[human-conditions]';
const OPENAI_MODELS = { o1Mini: 'o1-Mini' };
const OPENAI_MAX_TOKENS = 100;

const PROMPT = `
  Given the following condition and data object,
  evaluate whether the condition is true or false based on the object's properties.
`

const ERROR_MESSAGES = {
  UNSET_ENV_VAR: `${LOG_SIGNATURE}: OPENAI_API_KEY environment variable is not set.`,
  API_CALL: `${LOG_SIGNATURE}: Error in OpenAI API call`,
  EVALUATION_FAILURE: `${LOG_SIGNATURE}: Failed to evaluate the condition.`,
};

export {
  PROMPT,
  OPENAI_MODELS,
  OPENAI_MAX_TOKENS,
  ERROR_MESSAGES
};
