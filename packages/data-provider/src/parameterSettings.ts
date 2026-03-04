import {
  Verbosity,
  ImageDetail,
  EModelEndpoint,
  openAISettings,
  gpt5Settings,
  gpt5MiniSettings,
  gpt5NanoSettings,
  gpt5ChatLatestSettings,
  gpt4oSettings,
  chatgpt4oLatestSettings,
  gpt4oMiniSettings,
  googleSettings,
  ReasoningEffort,
  ReasoningSummary,
  BedrockProviders,
  anthropicSettings,
  OpenAIModelCategory,
} from './types';
import {
  DeepSeekModelCategory,
  deepSeekChatSettings,
  deepSeekCoderSettings,
  deepSeekReasonerSettings,
  ClaudeModelCategory,
  claudeOpus4_1Settings,
  claudeOpus4Settings,
  claudeSonnet4Settings,
  claude3_7SonnetSettings,
  claude3_5SonnetSettings,
  claude3HaikuSettings,
} from './schemas';
import { SettingDefinition, SettingsConfiguration } from './generate';

// Base definitions
const baseDefinitions: Record<string, SettingDefinition> = {
  model: {
    key: 'model',
    label: 'com_ui_model',
    labelCode: true,
    type: 'string',
    component: 'dropdown',
    optionType: 'model',
    selectPlaceholder: 'com_ui_select_model',
    searchPlaceholder: 'com_ui_select_search_model',
    searchPlaceholderCode: true,
    selectPlaceholderCode: true,
    columnSpan: 4,
  },
  temperature: {
    key: 'temperature',
    label: 'com_endpoint_temperature',
    labelCode: true,
    description: 'com_endpoint_openai_temp',
    descriptionCode: true,
    type: 'number',
    component: 'slider',
    optionType: 'model',
    columnSpan: 4,
  },
  topP: {
    key: 'topP',
    label: 'com_endpoint_top_p',
    labelCode: true,
    description: 'com_endpoint_anthropic_topp',
    descriptionCode: true,
    type: 'number',
    component: 'slider',
    optionType: 'model',
    columnSpan: 4,
  },
  stop: {
    key: 'stop',
    label: 'com_endpoint_stop',
    labelCode: true,
    description: 'com_endpoint_openai_stop',
    descriptionCode: true,
    placeholder: 'com_endpoint_stop_placeholder',
    placeholderCode: true,
    type: 'array',
    default: [],
    component: 'tags',
    optionType: 'conversation',
    minTags: 0,
    maxTags: 4,
  },
  imageDetail: {
    key: 'imageDetail',
    label: 'com_endpoint_plug_image_detail',
    labelCode: true,
    description: 'com_endpoint_openai_detail',
    descriptionCode: true,
    type: 'enum',
    default: ImageDetail.auto,
    component: 'slider',
    options: [ImageDetail.low, ImageDetail.auto, ImageDetail.high],
    enumMappings: {
      [ImageDetail.low]: 'com_ui_low',
      [ImageDetail.auto]: 'com_ui_auto',
      [ImageDetail.high]: 'com_ui_high',
    },
    optionType: 'conversation',
    columnSpan: 2,
  },
};

const createDefinition = (
  base: Partial<SettingDefinition>,
  overrides: Partial<SettingDefinition>,
): SettingDefinition => {
  return { ...base, ...overrides } as SettingDefinition;
};

export const librechat = {
  modelLabel: {
    key: 'modelLabel',
    label: 'com_endpoint_custom_name',
    labelCode: true,
    type: 'string',
    default: '',
    component: 'input',
    placeholder: 'com_endpoint_openai_custom_name_placeholder',
    placeholderCode: true,
    optionType: 'conversation',
  } as const,
  maxContextTokens: {
    key: 'maxContextTokens',
    label: 'com_endpoint_context_tokens',
    labelCode: true,
    type: 'number',
    component: 'input',
    placeholder: 'com_nav_theme_system',
    placeholderCode: true,
    description: 'com_endpoint_context_info',
    descriptionCode: true,
    optionType: 'model',
    columnSpan: 2,
  } as const,
  resendFiles: {
    key: 'resendFiles',
    label: 'com_endpoint_plug_resend_files',
    labelCode: true,
    description: 'com_endpoint_openai_resend_files',
    descriptionCode: true,
    type: 'boolean',
    default: true,
    component: 'switch',
    optionType: 'conversation',
    showDefault: false,
    columnSpan: 2,
  } as const,
  promptPrefix: {
    key: 'promptPrefix',
    label: 'com_endpoint_prompt_prefix',
    labelCode: true,
    type: 'string',
    default: '',
    component: 'textarea',
    placeholder: 'com_endpoint_openai_prompt_prefix_placeholder',
    placeholderCode: true,
    optionType: 'model',
  } as const,
};

const openAIParams: Record<string, SettingDefinition> = {
  chatGptLabel: {
    ...librechat.modelLabel,
    key: 'chatGptLabel',
  },
  promptPrefix: librechat.promptPrefix,
  temperature: createDefinition(baseDefinitions.temperature, {
    default: openAISettings.temperature.default,
    range: {
      min: openAISettings.temperature.min,
      max: openAISettings.temperature.max,
      step: openAISettings.temperature.step,
    },
  }),
  top_p: createDefinition(baseDefinitions.topP, {
    key: 'top_p',
    default: openAISettings.top_p.default,
    range: {
      min: openAISettings.top_p.min,
      max: openAISettings.top_p.max,
      step: openAISettings.top_p.step,
    },
  }),
  frequency_penalty: {
    key: 'frequency_penalty',
    label: 'com_endpoint_frequency_penalty',
    labelCode: true,
    description: 'com_endpoint_openai_freq',
    descriptionCode: true,
    type: 'number',
    default: openAISettings.frequency_penalty.default,
    range: {
      min: openAISettings.frequency_penalty.min,
      max: openAISettings.frequency_penalty.max,
      step: openAISettings.frequency_penalty.step,
    },
    component: 'slider',
    optionType: 'model',
    columnSpan: 4,
  },
  presence_penalty: {
    key: 'presence_penalty',
    label: 'com_endpoint_presence_penalty',
    labelCode: true,
    description: 'com_endpoint_openai_pres',
    descriptionCode: true,
    type: 'number',
    default: openAISettings.presence_penalty.default,
    range: {
      min: openAISettings.presence_penalty.min,
      max: openAISettings.presence_penalty.max,
      step: openAISettings.presence_penalty.step,
    },
    component: 'slider',
    optionType: 'model',
    columnSpan: 4,
  },
  max_tokens: {
    key: 'max_tokens',
    label: 'com_endpoint_max_output_tokens',
    labelCode: true,
    type: 'number',
    component: 'input',
    description: 'com_endpoint_openai_max_tokens',
    descriptionCode: true,
    placeholder: 'com_nav_theme_system',
    placeholderCode: true,
    optionType: 'model',
    columnSpan: 2,
  },
  reasoning_effort: {
    key: 'reasoning_effort',
    label: 'com_endpoint_reasoning_effort',
    labelCode: true,
    description: 'com_endpoint_openai_reasoning_effort',
    descriptionCode: true,
    type: 'enum',
    default: ReasoningEffort.none,
    component: 'slider',
    options: [
      ReasoningEffort.none,
      ReasoningEffort.minimal,
      ReasoningEffort.low,
      ReasoningEffort.medium,
      ReasoningEffort.high,
    ],
    enumMappings: {
      [ReasoningEffort.none]: 'com_ui_none',
      [ReasoningEffort.minimal]: 'com_ui_minimal',
      [ReasoningEffort.low]: 'com_ui_low',
      [ReasoningEffort.medium]: 'com_ui_medium',
      [ReasoningEffort.high]: 'com_ui_high',
    },
    optionType: 'model',
    columnSpan: 4,
  },
  useResponsesApi: {
    key: 'useResponsesApi',
    label: 'com_endpoint_use_responses_api',
    labelCode: true,
    description: 'com_endpoint_openai_use_responses_api',
    descriptionCode: true,
    type: 'boolean',
    default: false,
    component: 'switch',
    optionType: 'model',
    showDefault: false,
    columnSpan: 2,
  },
  web_search: {
    key: 'web_search',
    label: 'com_ui_web_search',
    labelCode: true,
    description: 'com_endpoint_openai_use_web_search',
    descriptionCode: true,
    type: 'boolean',
    default: false,
    component: 'switch',
    optionType: 'model',
    showDefault: false,
    columnSpan: 2,
  },
  reasoning_summary: {
    key: 'reasoning_summary',
    label: 'com_endpoint_reasoning_summary',
    labelCode: true,
    description: 'com_endpoint_openai_reasoning_summary',
    descriptionCode: true,
    type: 'enum',
    default: ReasoningSummary.none,
    component: 'slider',
    options: [
      ReasoningSummary.none,
      ReasoningSummary.auto,
      ReasoningSummary.concise,
      ReasoningSummary.detailed,
    ],
    enumMappings: {
      [ReasoningSummary.none]: 'com_ui_none',
      [ReasoningSummary.auto]: 'com_ui_auto',
      [ReasoningSummary.concise]: 'com_ui_concise',
      [ReasoningSummary.detailed]: 'com_ui_detailed',
    },
    optionType: 'model',
    columnSpan: 4,
  },
  verbosity: {
    key: 'verbosity',
    label: 'com_endpoint_verbosity',
    labelCode: true,
    description: 'com_endpoint_openai_verbosity',
    descriptionCode: true,
    type: 'enum',
    default: Verbosity.none,
    component: 'slider',
    options: [Verbosity.none, Verbosity.low, Verbosity.medium, Verbosity.high],
    enumMappings: {
      [Verbosity.none]: 'com_ui_none',
      [Verbosity.low]: 'com_ui_low',
      [Verbosity.medium]: 'com_ui_medium',
      [Verbosity.high]: 'com_ui_high',
    },
    optionType: 'model',
    columnSpan: 4,
  },
  disableStreaming: {
    key: 'disableStreaming',
    label: 'com_endpoint_disable_streaming_label',
    labelCode: true,
    description: 'com_endpoint_disable_streaming',
    descriptionCode: true,
    type: 'boolean',
    default: false,
    component: 'switch',
    optionType: 'model',
    showDefault: false,
    columnSpan: 2,
  } as const,
};

// Helper function to create model-specific parameters
const createModelParams = (settings: any): Record<string, SettingDefinition> => ({
  chatGptLabel: {
    ...librechat.modelLabel,
    key: 'chatGptLabel',
  },
  promptPrefix: librechat.promptPrefix,
  temperature: createDefinition(baseDefinitions.temperature, {
    default: settings.temperature.default,
    range: {
      min: settings.temperature.min,
      max: settings.temperature.max,
      step: settings.temperature.step,
    },
  }),
  top_p: createDefinition(baseDefinitions.topP, {
    key: 'top_p',
    default: settings.top_p.default,
    range: {
      min: settings.top_p.min,
      max: settings.top_p.max,
      step: settings.top_p.step,
    },
  }),
  frequency_penalty: {
    key: 'frequency_penalty',
    label: 'com_endpoint_frequency_penalty',
    labelCode: true,
    description: 'com_endpoint_openai_freq',
    descriptionCode: true,
    type: 'number',
    default: settings.frequency_penalty.default,
    range: {
      min: settings.frequency_penalty.min,
      max: settings.frequency_penalty.max,
      step: settings.frequency_penalty.step,
    },
    component: 'slider',
    optionType: 'model',
    columnSpan: 4,
  },
  presence_penalty: {
    key: 'presence_penalty',
    label: 'com_endpoint_presence_penalty',
    labelCode: true,
    description: 'com_endpoint_openai_pres',
    descriptionCode: true,
    type: 'number',
    default: settings.presence_penalty.default,
    range: {
      min: settings.presence_penalty.min,
      max: settings.presence_penalty.max,
      step: settings.presence_penalty.step,
    },
    component: 'slider',
    optionType: 'model',
    columnSpan: 4,
  },
  max_tokens: {
    key: 'max_tokens',
    label: 'com_endpoint_max_output_tokens',
    labelCode: true,
    type: 'number',
    component: 'input',
    description: 'com_endpoint_openai_max_tokens',
    descriptionCode: true,
    placeholder: 'com_nav_theme_system',
    placeholderCode: true,
    optionType: 'model',
    columnSpan: 2,
    ...(settings.max_tokens &&
      settings.max_tokens.min && {
        range: {
          min: settings.max_tokens.min,
          max: settings.max_tokens.max,
          step: 1,
        },
      }),
  },
  reasoning_effort: {
    key: 'reasoning_effort',
    label: 'com_endpoint_reasoning_effort',
    labelCode: true,
    description: 'com_endpoint_openai_reasoning_effort',
    descriptionCode: true,
    type: 'enum',
    default: ReasoningEffort.none,
    component: 'slider',
    options: [
      ReasoningEffort.none,
      ReasoningEffort.minimal,
      ReasoningEffort.low,
      ReasoningEffort.medium,
      ReasoningEffort.high,
    ],
    enumMappings: {
      [ReasoningEffort.none]: 'com_ui_none',
      [ReasoningEffort.minimal]: 'com_ui_minimal',
      [ReasoningEffort.low]: 'com_ui_low',
      [ReasoningEffort.medium]: 'com_ui_medium',
      [ReasoningEffort.high]: 'com_ui_high',
    },
    optionType: 'model',
    columnSpan: 4,
  },
  useResponsesApi: {
    key: 'useResponsesApi',
    label: 'com_endpoint_use_responses_api',
    labelCode: true,
    description: 'com_endpoint_openai_use_responses_api',
    descriptionCode: true,
    type: 'boolean',
    default: false,
    component: 'switch',
    optionType: 'model',
    showDefault: false,
    columnSpan: 2,
  },
  web_search: {
    key: 'web_search',
    label: 'com_ui_web_search',
    labelCode: true,
    description: 'com_endpoint_openai_use_web_search',
    descriptionCode: true,
    type: 'boolean',
    default: settings.supportsWebSearch ?? false,
    component: 'switch',
    optionType: 'model',
    showDefault: false,
    columnSpan: 2,
  },
  reasoning_summary: {
    key: 'reasoning_summary',
    label: 'com_endpoint_reasoning_summary',
    labelCode: true,
    description: 'com_endpoint_openai_reasoning_summary',
    descriptionCode: true,
    type: 'enum',
    default: ReasoningSummary.none,
    component: 'slider',
    options: [
      ReasoningSummary.none,
      ReasoningSummary.auto,
      ReasoningSummary.concise,
      ReasoningSummary.detailed,
    ],
    enumMappings: {
      [ReasoningSummary.none]: 'com_ui_none',
      [ReasoningSummary.auto]: 'com_ui_auto',
      [ReasoningSummary.concise]: 'com_ui_concise',
      [ReasoningSummary.detailed]: 'com_ui_detailed',
    },
    optionType: 'model',
    columnSpan: 4,
  },
  verbosity: {
    key: 'verbosity',
    label: 'com_endpoint_verbosity',
    labelCode: true,
    description: 'com_endpoint_openai_verbosity',
    descriptionCode: true,
    type: 'enum',
    default: Verbosity.none,
    component: 'slider',
    options: [Verbosity.none, Verbosity.low, Verbosity.medium, Verbosity.high],
    enumMappings: {
      [Verbosity.none]: 'com_ui_none',
      [Verbosity.low]: 'com_ui_low',
      [Verbosity.medium]: 'com_ui_medium',
      [Verbosity.high]: 'com_ui_high',
    },
    optionType: 'model',
    columnSpan: 4,
  },
  disableStreaming: {
    key: 'disableStreaming',
    label: 'com_endpoint_disable_streaming_label',
    labelCode: true,
    description: 'com_endpoint_disable_streaming',
    descriptionCode: true,
    type: 'boolean',
    default: false,
    component: 'switch',
    optionType: 'model',
    showDefault: false,
    columnSpan: 2,
  } as const,
});

// Model-specific parameter definitions
export const gpt5Params = createModelParams(gpt5Settings);
export const gpt5MiniParams = createModelParams(gpt5MiniSettings);
export const gpt5NanoParams = createModelParams(gpt5NanoSettings);
export const gpt5ChatLatestParams = createModelParams(gpt5ChatLatestSettings);
export const gpt4oParams = createModelParams(gpt4oSettings);
export const chatgpt4oLatestParams = createModelParams(chatgpt4oLatestSettings);
export const gpt4oMiniParams = createModelParams(gpt4oMiniSettings);

// DeepSeek model-specific parameter definitions
export const deepSeekChatParams = createModelParams(deepSeekChatSettings);
export const deepSeekCoderParams = createModelParams(deepSeekCoderSettings);
export const deepSeekReasonerParams = createModelParams(deepSeekReasonerSettings);

// Helper function to create Claude-specific parameters
const createClaudeParams = (settings: any): Record<string, SettingDefinition> => ({
  maxOutputTokens: {
    key: 'maxOutputTokens',
    label: 'com_endpoint_max_output_tokens',
    labelCode: true,
    type: 'number',
    component: 'input',
    description: 'com_endpoint_anthropic_maxoutputtokens',
    descriptionCode: true,
    placeholder: 'com_nav_theme_system',
    placeholderCode: true,
    range: {
      min: settings.maxOutputTokens.min,
      max: settings.maxOutputTokens.max,
      step: settings.maxOutputTokens.step,
    },
    optionType: 'model',
    columnSpan: 2,
  },
  temperature: createDefinition(baseDefinitions.temperature, {
    default: settings.temperature.default,
    range: {
      min: settings.temperature.min,
      max: settings.temperature.max,
      step: settings.temperature.step,
    },
  }),
  topP: createDefinition(baseDefinitions.topP, {
    default: settings.topP.default,
    range: {
      min: settings.topP.min,
      max: settings.topP.max,
      step: settings.topP.step,
    },
  }),
  topK: {
    key: 'topK',
    label: 'com_endpoint_top_k',
    labelCode: true,
    description: 'com_endpoint_anthropic_topk',
    descriptionCode: true,
    type: 'number',
    default: settings.topK.default,
    range: {
      min: settings.topK.min,
      max: settings.topK.max,
      step: settings.topK.step,
    },
    component: 'slider',
    optionType: 'model',
    columnSpan: 4,
  },
  promptCache: {
    key: 'promptCache',
    label: 'com_endpoint_prompt_cache',
    labelCode: true,
    description: 'com_endpoint_anthropic_prompt_cache',
    descriptionCode: true,
    type: 'boolean',
    default: settings.promptCache.default,
    component: 'switch',
    optionType: 'conversation',
    showDefault: false,
    columnSpan: 2,
  },
  thinking: {
    key: 'thinking',
    label: 'com_endpoint_thinking',
    labelCode: true,
    description: 'com_endpoint_anthropic_thinking',
    descriptionCode: true,
    type: 'boolean',
    default: settings.thinking.default,
    component: 'switch',
    optionType: 'conversation',
    showDefault: false,
    columnSpan: 2,
  },
  thinkingBudget: {
    key: 'thinkingBudget',
    label: 'com_endpoint_thinking_budget',
    labelCode: true,
    description: 'com_endpoint_anthropic_thinking_budget',
    descriptionCode: true,
    type: 'number',
    component: 'input',
    default: settings.thinkingBudget.default,
    range: {
      min: settings.thinkingBudget.min,
      max: settings.thinkingBudget.max,
      step: settings.thinkingBudget.step,
    },
    optionType: 'conversation',
    columnSpan: 2,
  },
  web_search: {
    key: 'web_search',
    label: 'com_ui_web_search',
    labelCode: true,
    description: 'com_endpoint_anthropic_use_web_search',
    descriptionCode: true,
    type: 'boolean',
    default: settings.supportsWebSearch ?? false,
    component: 'switch',
    optionType: 'model',
    showDefault: false,
    columnSpan: 2,
  },
});

// Claude model-specific parameter definitions
export const claudeOpus4_1Params = createClaudeParams(claudeOpus4_1Settings);
export const claudeOpus4Params = createClaudeParams(claudeOpus4Settings);
export const claudeSonnet4Params = createClaudeParams(claudeSonnet4Settings);
export const claude3_7SonnetParams = createClaudeParams(claude3_7SonnetSettings);
export const claude3_5SonnetParams = createClaudeParams(claude3_5SonnetSettings);
export const claude3HaikuParams = createClaudeParams(claude3HaikuSettings);

const anthropic: Record<string, SettingDefinition> = {
  maxOutputTokens: {
    key: 'maxOutputTokens',
    label: 'com_endpoint_max_output_tokens',
    labelCode: true,
    type: 'number',
    component: 'input',
    description: 'com_endpoint_anthropic_maxoutputtokens',
    descriptionCode: true,
    placeholder: 'com_nav_theme_system',
    placeholderCode: true,
    range: {
      min: anthropicSettings.maxOutputTokens.min,
      max: anthropicSettings.maxOutputTokens.max,
      step: anthropicSettings.maxOutputTokens.step,
    },
    optionType: 'model',
    columnSpan: 2,
  },
  temperature: createDefinition(baseDefinitions.temperature, {
    default: anthropicSettings.temperature.default,
    range: {
      min: anthropicSettings.temperature.min,
      max: anthropicSettings.temperature.max,
      step: anthropicSettings.temperature.step,
    },
  }),
  topP: createDefinition(baseDefinitions.topP, {
    default: anthropicSettings.topP.default,
    range: {
      min: anthropicSettings.topP.min,
      max: anthropicSettings.topP.max,
      step: anthropicSettings.topP.step,
    },
  }),
  topK: {
    key: 'topK',
    label: 'com_endpoint_top_k',
    labelCode: true,
    description: 'com_endpoint_anthropic_topk',
    descriptionCode: true,
    type: 'number',
    default: anthropicSettings.topK.default,
    range: {
      min: anthropicSettings.topK.min,
      max: anthropicSettings.topK.max,
      step: anthropicSettings.topK.step,
    },
    component: 'slider',
    optionType: 'model',
    columnSpan: 4,
  },
  promptCache: {
    key: 'promptCache',
    label: 'com_endpoint_prompt_cache',
    labelCode: true,
    description: 'com_endpoint_anthropic_prompt_cache',
    descriptionCode: true,
    type: 'boolean',
    default: anthropicSettings.promptCache.default,
    component: 'switch',
    optionType: 'conversation',
    showDefault: false,
    columnSpan: 2,
  },
  thinking: {
    key: 'thinking',
    label: 'com_endpoint_thinking',
    labelCode: true,
    description: 'com_endpoint_anthropic_thinking',
    descriptionCode: true,
    type: 'boolean',
    default: anthropicSettings.thinking.default,
    component: 'switch',
    optionType: 'conversation',
    showDefault: false,
    columnSpan: 2,
  },
  thinkingBudget: {
    key: 'thinkingBudget',
    label: 'com_endpoint_thinking_budget',
    labelCode: true,
    description: 'com_endpoint_anthropic_thinking_budget',
    descriptionCode: true,
    type: 'number',
    component: 'input',
    default: anthropicSettings.thinkingBudget.default,
    range: {
      min: anthropicSettings.thinkingBudget.min,
      max: anthropicSettings.thinkingBudget.max,
      step: anthropicSettings.thinkingBudget.step,
    },
    optionType: 'conversation',
    columnSpan: 2,
  },
  web_search: {
    key: 'web_search',
    label: 'com_ui_web_search',
    labelCode: true,
    description: 'com_endpoint_anthropic_use_web_search',
    descriptionCode: true,
    type: 'boolean',
    default: anthropicSettings.web_search.default,
    component: 'switch',
    optionType: 'conversation',
    showDefault: false,
    columnSpan: 2,
  },
};

const bedrock: Record<string, SettingDefinition> = {
  system: {
    key: 'system',
    label: 'com_endpoint_prompt_prefix',
    labelCode: true,
    type: 'string',
    default: '',
    component: 'textarea',
    placeholder: 'com_endpoint_openai_prompt_prefix_placeholder',
    placeholderCode: true,
    optionType: 'model',
  },
  region: {
    key: 'region',
    type: 'string',
    label: 'com_ui_region',
    labelCode: true,
    component: 'combobox',
    optionType: 'conversation',
    selectPlaceholder: 'com_ui_select_region',
    searchPlaceholder: 'com_ui_select_search_region',
    searchPlaceholderCode: true,
    selectPlaceholderCode: true,
    columnSpan: 2,
  },
  maxTokens: {
    key: 'maxTokens',
    label: 'com_endpoint_max_output_tokens',
    labelCode: true,
    type: 'number',
    component: 'input',
    description: 'com_endpoint_anthropic_maxoutputtokens',
    descriptionCode: true,
    placeholder: 'com_nav_theme_system',
    placeholderCode: true,
    optionType: 'model',
    columnSpan: 2,
  },
  temperature: createDefinition(baseDefinitions.temperature, {
    default: 1,
    range: { min: 0, max: 1, step: 0.01 },
  }),
  topK: createDefinition(anthropic.topK, {
    range: { min: 0, max: 500, step: 1 },
  }),
  topP: createDefinition(baseDefinitions.topP, {
    default: 0.999,
    range: { min: 0, max: 1, step: 0.01 },
  }),
};

const mistral: Record<string, SettingDefinition> = {
  temperature: createDefinition(baseDefinitions.temperature, {
    default: 0.7,
    range: { min: 0, max: 1, step: 0.01 },
  }),
  topP: createDefinition(baseDefinitions.topP, {
    range: { min: 0, max: 1, step: 0.01 },
  }),
};

const cohere: Record<string, SettingDefinition> = {
  temperature: createDefinition(baseDefinitions.temperature, {
    default: 0.3,
    range: { min: 0, max: 1, step: 0.01 },
  }),
  topP: createDefinition(baseDefinitions.topP, {
    default: 0.75,
    range: { min: 0.01, max: 0.99, step: 0.01 },
  }),
};

const meta: Record<string, SettingDefinition> = {
  temperature: createDefinition(baseDefinitions.temperature, {
    default: 0.5,
    range: { min: 0, max: 1, step: 0.01 },
  }),
  topP: createDefinition(baseDefinitions.topP, {
    default: 0.9,
    range: { min: 0, max: 1, step: 0.01 },
  }),
};

const google: Record<string, SettingDefinition> = {
  temperature: createDefinition(baseDefinitions.temperature, {
    default: googleSettings.temperature.default,
    range: {
      min: googleSettings.temperature.min,
      max: googleSettings.temperature.max,
      step: googleSettings.temperature.step,
    },
  }),
  topP: createDefinition(baseDefinitions.topP, {
    default: googleSettings.topP.default,
    range: {
      min: googleSettings.topP.min,
      max: googleSettings.topP.max,
      step: googleSettings.topP.step,
    },
  }),
  topK: {
    key: 'topK',
    label: 'com_endpoint_top_k',
    labelCode: true,
    description: 'com_endpoint_google_topk',
    descriptionCode: true,
    type: 'number',
    default: googleSettings.topK.default,
    range: {
      min: googleSettings.topK.min,
      max: googleSettings.topK.max,
      step: googleSettings.topK.step,
    },
    component: 'slider',
    optionType: 'model',
    columnSpan: 4,
  },
  maxOutputTokens: {
    key: 'maxOutputTokens',
    label: 'com_endpoint_max_output_tokens',
    labelCode: true,
    type: 'number',
    component: 'input',
    description: 'com_endpoint_google_maxoutputtokens',
    descriptionCode: true,
    placeholder: 'com_nav_theme_system',
    placeholderCode: true,
    default: googleSettings.maxOutputTokens.default,
    range: {
      min: googleSettings.maxOutputTokens.min,
      max: googleSettings.maxOutputTokens.max,
      step: googleSettings.maxOutputTokens.step,
    },
    optionType: 'model',
    columnSpan: 2,
  },
  thinking: {
    key: 'thinking',
    label: 'com_endpoint_thinking',
    labelCode: true,
    description: 'com_endpoint_google_thinking',
    descriptionCode: true,
    type: 'boolean',
    default: googleSettings.thinking.default,
    component: 'switch',
    optionType: 'conversation',
    showDefault: false,
    columnSpan: 2,
  },
  thinkingBudget: {
    key: 'thinkingBudget',
    label: 'com_endpoint_thinking_budget',
    labelCode: true,
    description: 'com_endpoint_google_thinking_budget',
    descriptionCode: true,
    placeholder: 'com_ui_auto',
    placeholderCode: true,
    type: 'number',
    component: 'input',
    range: {
      min: googleSettings.thinkingBudget.min,
      max: googleSettings.thinkingBudget.max,
      step: googleSettings.thinkingBudget.step,
    },
    optionType: 'conversation',
    columnSpan: 2,
  },
  web_search: {
    key: 'web_search',
    label: 'com_endpoint_use_search_grounding',
    labelCode: true,
    description: 'com_endpoint_google_use_search_grounding',
    descriptionCode: true,
    type: 'boolean',
    default: false,
    component: 'switch',
    optionType: 'model',
    showDefault: false,
    columnSpan: 2,
  },
};

const googleConfig: SettingsConfiguration = [
  librechat.modelLabel,
  librechat.promptPrefix,
  librechat.maxContextTokens,
  google.maxOutputTokens,
  google.temperature,
  google.topP,
  google.topK,
  librechat.resendFiles,
  google.thinking,
  google.thinkingBudget,
  google.web_search,
];

const googleCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const googleCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  google.maxOutputTokens,
  google.temperature,
  google.topP,
  google.topK,
  librechat.resendFiles,
  google.thinking,
  google.thinkingBudget,
  google.web_search,
];

const openAI: SettingsConfiguration = [
  librechat.modelLabel,
  librechat.promptPrefix,
  librechat.maxContextTokens,
  openAIParams.max_tokens,
  openAIParams.temperature,
  openAIParams.top_p,
  openAIParams.frequency_penalty,
  openAIParams.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  baseDefinitions.imageDetail,
  openAIParams.web_search,
  openAIParams.reasoning_effort,
  openAIParams.useResponsesApi,
  openAIParams.reasoning_summary,
  openAIParams.verbosity,
  openAIParams.disableStreaming,
];

const openAICol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const openAICol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  openAIParams.max_tokens,
  openAIParams.temperature,
  openAIParams.top_p,
  openAIParams.frequency_penalty,
  openAIParams.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  baseDefinitions.imageDetail,
  openAIParams.reasoning_effort,
  openAIParams.reasoning_summary,
  openAIParams.verbosity,
  openAIParams.useResponsesApi,
  openAIParams.web_search,
  openAIParams.disableStreaming,
];

// Model-specific column configurations
const gpt4oCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const gpt4oCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  gpt4oParams.max_tokens,
  gpt4oParams.temperature,
  gpt4oParams.top_p,
  gpt4oParams.frequency_penalty,
  gpt4oParams.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  baseDefinitions.imageDetail,
  gpt4oParams.reasoning_effort,
  gpt4oParams.reasoning_summary,
  gpt4oParams.verbosity,
  gpt4oParams.useResponsesApi,
  gpt4oParams.web_search,
  gpt4oParams.disableStreaming,
];

const gpt5Col1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const gpt5Col2: SettingsConfiguration = [
  librechat.maxContextTokens,
  gpt5Params.max_tokens,
  gpt5Params.temperature,
  gpt5Params.top_p,
  gpt5Params.frequency_penalty,
  gpt5Params.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  baseDefinitions.imageDetail,
  gpt5Params.reasoning_effort,
  gpt5Params.reasoning_summary,
  gpt5Params.verbosity,
  gpt5Params.useResponsesApi,
  gpt5Params.web_search,
  gpt5Params.disableStreaming,
];

const gpt5MiniCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const gpt5MiniCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  gpt5MiniParams.max_tokens,
  gpt5MiniParams.temperature,
  gpt5MiniParams.top_p,
  gpt5MiniParams.frequency_penalty,
  gpt5MiniParams.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  baseDefinitions.imageDetail,
  gpt5MiniParams.reasoning_effort,
  gpt5MiniParams.reasoning_summary,
  gpt5MiniParams.verbosity,
  gpt5MiniParams.useResponsesApi,
  gpt5MiniParams.web_search,
  gpt5MiniParams.disableStreaming,
];

const gpt5NanoCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const gpt5NanoCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  gpt5NanoParams.max_tokens,
  gpt5NanoParams.temperature,
  gpt5NanoParams.top_p,
  gpt5NanoParams.frequency_penalty,
  gpt5NanoParams.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  // GPT-5-nano doesn't support vision
  gpt5NanoParams.reasoning_effort,
  gpt5NanoParams.reasoning_summary,
  gpt5NanoParams.verbosity,
  gpt5NanoParams.useResponsesApi,
  gpt5NanoParams.web_search,
  gpt5NanoParams.disableStreaming,
];

const gpt5ChatLatestCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const gpt5ChatLatestCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  gpt5ChatLatestParams.max_tokens,
  gpt5ChatLatestParams.temperature,
  gpt5ChatLatestParams.top_p,
  gpt5ChatLatestParams.frequency_penalty,
  gpt5ChatLatestParams.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  baseDefinitions.imageDetail,
  gpt5ChatLatestParams.reasoning_effort,
  gpt5ChatLatestParams.reasoning_summary,
  gpt5ChatLatestParams.verbosity,
  gpt5ChatLatestParams.useResponsesApi,
  gpt5ChatLatestParams.web_search,
  gpt5ChatLatestParams.disableStreaming,
];

const chatgpt4oLatestCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const chatgpt4oLatestCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  chatgpt4oLatestParams.max_tokens,
  chatgpt4oLatestParams.temperature,
  chatgpt4oLatestParams.top_p,
  chatgpt4oLatestParams.frequency_penalty,
  chatgpt4oLatestParams.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  baseDefinitions.imageDetail,
  chatgpt4oLatestParams.reasoning_effort,
  chatgpt4oLatestParams.reasoning_summary,
  chatgpt4oLatestParams.verbosity,
  chatgpt4oLatestParams.useResponsesApi,
  chatgpt4oLatestParams.web_search,
  chatgpt4oLatestParams.disableStreaming,
];

const gpt4oMiniCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const gpt4oMiniCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  gpt4oMiniParams.max_tokens,
  gpt4oMiniParams.temperature,
  gpt4oMiniParams.top_p,
  gpt4oMiniParams.frequency_penalty,
  gpt4oMiniParams.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  baseDefinitions.imageDetail,
  gpt4oMiniParams.reasoning_effort,
  gpt4oMiniParams.reasoning_summary,
  gpt4oMiniParams.verbosity,
  gpt4oMiniParams.useResponsesApi,
  gpt4oMiniParams.web_search,
  gpt4oMiniParams.disableStreaming,
];

// DeepSeek column configurations
const deepSeekChatCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const deepSeekChatCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  deepSeekChatParams.max_tokens,
  deepSeekChatParams.temperature,
  deepSeekChatParams.top_p,
  deepSeekChatParams.frequency_penalty,
  deepSeekChatParams.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  deepSeekChatParams.reasoning_effort,
  deepSeekChatParams.reasoning_summary,
  deepSeekChatParams.verbosity,
  deepSeekChatParams.useResponsesApi,
  deepSeekChatParams.disableStreaming,
];

const deepSeekCoderCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const deepSeekCoderCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  deepSeekCoderParams.max_tokens,
  deepSeekCoderParams.temperature,
  deepSeekCoderParams.top_p,
  deepSeekCoderParams.frequency_penalty,
  deepSeekCoderParams.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  deepSeekCoderParams.reasoning_effort,
  deepSeekCoderParams.reasoning_summary,
  deepSeekCoderParams.verbosity,
  deepSeekCoderParams.useResponsesApi,
  deepSeekCoderParams.disableStreaming,
];

const deepSeekReasonerCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const deepSeekReasonerCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  deepSeekReasonerParams.max_tokens,
  deepSeekReasonerParams.temperature,
  deepSeekReasonerParams.top_p,
  deepSeekReasonerParams.frequency_penalty,
  deepSeekReasonerParams.presence_penalty,
  baseDefinitions.stop,
  librechat.resendFiles,
  deepSeekReasonerParams.reasoning_effort,
  deepSeekReasonerParams.reasoning_summary,
  deepSeekReasonerParams.verbosity,
  deepSeekReasonerParams.useResponsesApi,
  deepSeekReasonerParams.disableStreaming,
];

const anthropicConfig: SettingsConfiguration = [
  librechat.modelLabel,
  librechat.promptPrefix,
  librechat.maxContextTokens,
  anthropic.maxOutputTokens,
  anthropic.temperature,
  anthropic.topP,
  anthropic.topK,
  librechat.resendFiles,
  anthropic.promptCache,
  anthropic.thinking,
  anthropic.thinkingBudget,
  anthropic.web_search,
];

const anthropicCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const anthropicCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  anthropic.maxOutputTokens,
  anthropic.temperature,
  anthropic.topP,
  anthropic.topK,
  librechat.resendFiles,
  anthropic.promptCache,
  anthropic.thinking,
  anthropic.thinkingBudget,
  anthropic.web_search,
];

// Claude model-specific column configurations
const claudeOpus4_1Col1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const claudeOpus4_1Col2: SettingsConfiguration = [
  librechat.maxContextTokens,
  claudeOpus4_1Params.maxOutputTokens,
  claudeOpus4_1Params.temperature,
  claudeOpus4_1Params.topP,
  claudeOpus4_1Params.topK,
  baseDefinitions.stop,
  librechat.resendFiles,
  claudeOpus4_1Params.promptCache,
  claudeOpus4_1Params.thinking,
  claudeOpus4_1Params.thinkingBudget,
  claudeOpus4_1Params.web_search,
];

const claudeOpus4Col1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const claudeOpus4Col2: SettingsConfiguration = [
  librechat.maxContextTokens,
  claudeOpus4Params.maxOutputTokens,
  claudeOpus4Params.temperature,
  claudeOpus4Params.topP,
  claudeOpus4Params.topK,
  baseDefinitions.stop,
  librechat.resendFiles,
  claudeOpus4Params.promptCache,
  claudeOpus4Params.thinking,
  claudeOpus4Params.thinkingBudget,
  claudeOpus4Params.web_search,
];

const claudeSonnet4Col1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const claudeSonnet4Col2: SettingsConfiguration = [
  librechat.maxContextTokens,
  claudeSonnet4Params.maxOutputTokens,
  claudeSonnet4Params.temperature,
  claudeSonnet4Params.topP,
  claudeSonnet4Params.topK,
  baseDefinitions.stop,
  librechat.resendFiles,
  claudeSonnet4Params.promptCache,
  claudeSonnet4Params.thinking,
  claudeSonnet4Params.thinkingBudget,
  claudeSonnet4Params.web_search,
];

const claude3_7SonnetCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const claude3_7SonnetCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  claude3_7SonnetParams.maxOutputTokens,
  claude3_7SonnetParams.temperature,
  claude3_7SonnetParams.topP,
  claude3_7SonnetParams.topK,
  baseDefinitions.stop,
  librechat.resendFiles,
  claude3_7SonnetParams.promptCache,
  claude3_7SonnetParams.thinking,
  claude3_7SonnetParams.thinkingBudget,
  claude3_7SonnetParams.web_search,
];

const claude3_5SonnetCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const claude3_5SonnetCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  claude3_5SonnetParams.maxOutputTokens,
  claude3_5SonnetParams.temperature,
  claude3_5SonnetParams.topP,
  claude3_5SonnetParams.topK,
  baseDefinitions.stop,
  librechat.resendFiles,
  claude3_5SonnetParams.promptCache,
  claude3_5SonnetParams.thinking,
  claude3_5SonnetParams.thinkingBudget,
  claude3_5SonnetParams.web_search,
];

const claude3HaikuCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const claude3HaikuCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  claude3HaikuParams.maxOutputTokens,
  claude3HaikuParams.temperature,
  claude3HaikuParams.topP,
  claude3HaikuParams.topK,
  baseDefinitions.stop,
  librechat.resendFiles,
  claude3HaikuParams.promptCache,
  claude3HaikuParams.thinking,
  claude3HaikuParams.thinkingBudget,
  claude3HaikuParams.web_search,
];

const bedrockAnthropic: SettingsConfiguration = [
  librechat.modelLabel,
  bedrock.system,
  librechat.maxContextTokens,
  bedrock.maxTokens,
  bedrock.temperature,
  bedrock.topP,
  bedrock.topK,
  baseDefinitions.stop,
  librechat.resendFiles,
  bedrock.region,
  anthropic.thinking,
  anthropic.thinkingBudget,
];

const bedrockMistral: SettingsConfiguration = [
  librechat.modelLabel,
  librechat.promptPrefix,
  librechat.maxContextTokens,
  bedrock.maxTokens,
  mistral.temperature,
  mistral.topP,
  librechat.resendFiles,
  bedrock.region,
];

const bedrockCohere: SettingsConfiguration = [
  librechat.modelLabel,
  librechat.promptPrefix,
  librechat.maxContextTokens,
  bedrock.maxTokens,
  cohere.temperature,
  cohere.topP,
  librechat.resendFiles,
  bedrock.region,
];

const bedrockGeneral: SettingsConfiguration = [
  librechat.modelLabel,
  librechat.promptPrefix,
  librechat.maxContextTokens,
  meta.temperature,
  meta.topP,
  librechat.resendFiles,
  bedrock.region,
];

const bedrockAnthropicCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  bedrock.system,
  baseDefinitions.stop,
];

const bedrockAnthropicCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  bedrock.maxTokens,
  bedrock.temperature,
  bedrock.topP,
  bedrock.topK,
  librechat.resendFiles,
  bedrock.region,
  anthropic.thinking,
  anthropic.thinkingBudget,
];

const bedrockMistralCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const bedrockMistralCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  bedrock.maxTokens,
  mistral.temperature,
  mistral.topP,
  librechat.resendFiles,
  bedrock.region,
];

const bedrockCohereCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const bedrockCohereCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  bedrock.maxTokens,
  cohere.temperature,
  cohere.topP,
  librechat.resendFiles,
  bedrock.region,
];

const bedrockGeneralCol1: SettingsConfiguration = [
  baseDefinitions.model as SettingDefinition,
  librechat.modelLabel,
  librechat.promptPrefix,
];

const bedrockGeneralCol2: SettingsConfiguration = [
  librechat.maxContextTokens,
  meta.temperature,
  meta.topP,
  librechat.resendFiles,
  bedrock.region,
];

export const paramSettings: Record<string, SettingsConfiguration | undefined> = {
  [EModelEndpoint.openAI]: openAI,
  [EModelEndpoint.azureOpenAI]: openAI,
  [EModelEndpoint.custom]: openAI,
  // Model-specific OpenAI parameter settings
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT5}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5Params.chatGptLabel,
    gpt5Params.promptPrefix,
    librechat.maxContextTokens,
    gpt5Params.max_tokens,
    gpt5Params.temperature,
    gpt5Params.top_p,
    gpt5Params.frequency_penalty,
    gpt5Params.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt5Params.web_search,
    gpt5Params.reasoning_effort,
    gpt5Params.useResponsesApi,
    gpt5Params.reasoning_summary,
    gpt5Params.verbosity,
    gpt5Params.disableStreaming,
  ],
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT5Mini}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5MiniParams.chatGptLabel,
    gpt5MiniParams.promptPrefix,
    librechat.maxContextTokens,
    gpt5MiniParams.max_tokens,
    gpt5MiniParams.temperature,
    gpt5MiniParams.top_p,
    gpt5MiniParams.frequency_penalty,
    gpt5MiniParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt5MiniParams.web_search,
    gpt5MiniParams.reasoning_effort,
    gpt5MiniParams.useResponsesApi,
    gpt5MiniParams.reasoning_summary,
    gpt5MiniParams.verbosity,
    gpt5MiniParams.disableStreaming,
  ],
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT5Nano}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5NanoParams.chatGptLabel,
    gpt5NanoParams.promptPrefix,
    librechat.maxContextTokens,
    gpt5NanoParams.max_tokens,
    gpt5NanoParams.temperature,
    gpt5NanoParams.top_p,
    gpt5NanoParams.frequency_penalty,
    gpt5NanoParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    gpt5NanoParams.reasoning_effort,
    gpt5NanoParams.reasoning_summary,
    gpt5NanoParams.verbosity,
    gpt5NanoParams.useResponsesApi,
    gpt5NanoParams.disableStreaming,
  ],
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT5ChatLatest}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5ChatLatestParams.chatGptLabel,
    gpt5ChatLatestParams.promptPrefix,
    librechat.maxContextTokens,
    gpt5ChatLatestParams.max_tokens,
    gpt5ChatLatestParams.temperature,
    gpt5ChatLatestParams.top_p,
    gpt5ChatLatestParams.frequency_penalty,
    gpt5ChatLatestParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt5ChatLatestParams.reasoning_effort,
    gpt5ChatLatestParams.reasoning_summary,
    gpt5ChatLatestParams.verbosity,
    gpt5ChatLatestParams.useResponsesApi,
    gpt5ChatLatestParams.disableStreaming,
  ],
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT4o}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt4oParams.chatGptLabel,
    gpt4oParams.promptPrefix,
    librechat.maxContextTokens,
    gpt4oParams.max_tokens,
    gpt4oParams.temperature,
    gpt4oParams.top_p,
    gpt4oParams.frequency_penalty,
    gpt4oParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt4oParams.reasoning_effort,
    gpt4oParams.reasoning_summary,
    gpt4oParams.verbosity,
    gpt4oParams.useResponsesApi,
    gpt4oParams.disableStreaming,
  ],
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.ChatGPT4oLatest}`]: [
    baseDefinitions.model as SettingDefinition,
    chatgpt4oLatestParams.chatGptLabel,
    chatgpt4oLatestParams.promptPrefix,
    librechat.maxContextTokens,
    chatgpt4oLatestParams.max_tokens,
    chatgpt4oLatestParams.temperature,
    chatgpt4oLatestParams.top_p,
    chatgpt4oLatestParams.frequency_penalty,
    chatgpt4oLatestParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    chatgpt4oLatestParams.reasoning_effort,
    chatgpt4oLatestParams.reasoning_summary,
    chatgpt4oLatestParams.verbosity,
    chatgpt4oLatestParams.useResponsesApi,
    chatgpt4oLatestParams.disableStreaming,
  ],
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT4oMini}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt4oMiniParams.chatGptLabel,
    gpt4oMiniParams.promptPrefix,
    librechat.maxContextTokens,
    gpt4oMiniParams.max_tokens,
    gpt4oMiniParams.temperature,
    gpt4oMiniParams.top_p,
    gpt4oMiniParams.frequency_penalty,
    gpt4oMiniParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt4oMiniParams.reasoning_effort,
    gpt4oMiniParams.reasoning_summary,
    gpt4oMiniParams.verbosity,
    gpt4oMiniParams.useResponsesApi,
    gpt4oMiniParams.disableStreaming,
  ],
  // Azure OpenAI model-specific parameter settings
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT5}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5Params.chatGptLabel,
    gpt5Params.promptPrefix,
    librechat.maxContextTokens,
    gpt5Params.max_tokens,
    gpt5Params.temperature,
    gpt5Params.top_p,
    gpt5Params.frequency_penalty,
    gpt5Params.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt5Params.web_search,
    gpt5Params.reasoning_effort,
    gpt5Params.useResponsesApi,
    gpt5Params.reasoning_summary,
    gpt5Params.verbosity,
    gpt5Params.disableStreaming,
  ],
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT5Mini}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5MiniParams.chatGptLabel,
    gpt5MiniParams.promptPrefix,
    librechat.maxContextTokens,
    gpt5MiniParams.max_tokens,
    gpt5MiniParams.temperature,
    gpt5MiniParams.top_p,
    gpt5MiniParams.frequency_penalty,
    gpt5MiniParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt5MiniParams.web_search,
    gpt5MiniParams.reasoning_effort,
    gpt5MiniParams.useResponsesApi,
    gpt5MiniParams.reasoning_summary,
    gpt5MiniParams.verbosity,
    gpt5MiniParams.disableStreaming,
  ],
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT5Nano}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5NanoParams.chatGptLabel,
    gpt5NanoParams.promptPrefix,
    librechat.maxContextTokens,
    gpt5NanoParams.max_tokens,
    gpt5NanoParams.temperature,
    gpt5NanoParams.top_p,
    gpt5NanoParams.frequency_penalty,
    gpt5NanoParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    gpt5NanoParams.reasoning_effort,
    gpt5NanoParams.reasoning_summary,
    gpt5NanoParams.verbosity,
    gpt5NanoParams.useResponsesApi,
    gpt5NanoParams.disableStreaming,
  ],
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT5ChatLatest}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5ChatLatestParams.chatGptLabel,
    gpt5ChatLatestParams.promptPrefix,
    librechat.maxContextTokens,
    gpt5ChatLatestParams.max_tokens,
    gpt5ChatLatestParams.temperature,
    gpt5ChatLatestParams.top_p,
    gpt5ChatLatestParams.frequency_penalty,
    gpt5ChatLatestParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt5ChatLatestParams.reasoning_effort,
    gpt5ChatLatestParams.reasoning_summary,
    gpt5ChatLatestParams.verbosity,
    gpt5ChatLatestParams.useResponsesApi,
    gpt5ChatLatestParams.disableStreaming,
  ],
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT4o}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt4oParams.chatGptLabel,
    gpt4oParams.promptPrefix,
    librechat.maxContextTokens,
    gpt4oParams.max_tokens,
    gpt4oParams.temperature,
    gpt4oParams.top_p,
    gpt4oParams.frequency_penalty,
    gpt4oParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt4oParams.reasoning_effort,
    gpt4oParams.reasoning_summary,
    gpt4oParams.verbosity,
    gpt4oParams.useResponsesApi,
    gpt4oParams.disableStreaming,
  ],
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.ChatGPT4oLatest}`]: [
    baseDefinitions.model as SettingDefinition,
    chatgpt4oLatestParams.chatGptLabel,
    chatgpt4oLatestParams.promptPrefix,
    librechat.maxContextTokens,
    chatgpt4oLatestParams.max_tokens,
    chatgpt4oLatestParams.temperature,
    chatgpt4oLatestParams.top_p,
    chatgpt4oLatestParams.frequency_penalty,
    chatgpt4oLatestParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    chatgpt4oLatestParams.reasoning_effort,
    chatgpt4oLatestParams.reasoning_summary,
    chatgpt4oLatestParams.verbosity,
    chatgpt4oLatestParams.useResponsesApi,
    chatgpt4oLatestParams.disableStreaming,
  ],
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT4oMini}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt4oMiniParams.chatGptLabel,
    gpt4oMiniParams.promptPrefix,
    librechat.maxContextTokens,
    gpt4oMiniParams.max_tokens,
    gpt4oMiniParams.temperature,
    gpt4oMiniParams.top_p,
    gpt4oMiniParams.frequency_penalty,
    gpt4oMiniParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt4oMiniParams.reasoning_effort,
    gpt4oMiniParams.reasoning_summary,
    gpt4oMiniParams.verbosity,
    gpt4oMiniParams.useResponsesApi,
    gpt4oMiniParams.disableStreaming,
  ],
  // Custom endpoint model-specific parameter settings
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT5}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5Params.chatGptLabel,
    gpt5Params.promptPrefix,
    librechat.maxContextTokens,
    gpt5Params.max_tokens,
    gpt5Params.temperature,
    gpt5Params.top_p,
    gpt5Params.frequency_penalty,
    gpt5Params.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt5Params.web_search,
    gpt5Params.reasoning_effort,
    gpt5Params.useResponsesApi,
    gpt5Params.reasoning_summary,
    gpt5Params.verbosity,
    gpt5Params.disableStreaming,
  ],
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT5Mini}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5MiniParams.chatGptLabel,
    gpt5MiniParams.promptPrefix,
    librechat.maxContextTokens,
    gpt5MiniParams.max_tokens,
    gpt5MiniParams.temperature,
    gpt5MiniParams.top_p,
    gpt5MiniParams.frequency_penalty,
    gpt5MiniParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt5MiniParams.web_search,
    gpt5MiniParams.reasoning_effort,
    gpt5MiniParams.useResponsesApi,
    gpt5MiniParams.reasoning_summary,
    gpt5MiniParams.verbosity,
    gpt5MiniParams.disableStreaming,
  ],
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT5Nano}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5NanoParams.chatGptLabel,
    gpt5NanoParams.promptPrefix,
    librechat.maxContextTokens,
    gpt5NanoParams.max_tokens,
    gpt5NanoParams.temperature,
    gpt5NanoParams.top_p,
    gpt5NanoParams.frequency_penalty,
    gpt5NanoParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    gpt5NanoParams.reasoning_effort,
    gpt5NanoParams.reasoning_summary,
    gpt5NanoParams.verbosity,
    gpt5NanoParams.useResponsesApi,
    gpt5NanoParams.disableStreaming,
  ],
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT5ChatLatest}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt5ChatLatestParams.chatGptLabel,
    gpt5ChatLatestParams.promptPrefix,
    librechat.maxContextTokens,
    gpt5ChatLatestParams.max_tokens,
    gpt5ChatLatestParams.temperature,
    gpt5ChatLatestParams.top_p,
    gpt5ChatLatestParams.frequency_penalty,
    gpt5ChatLatestParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt5ChatLatestParams.reasoning_effort,
    gpt5ChatLatestParams.reasoning_summary,
    gpt5ChatLatestParams.verbosity,
    gpt5ChatLatestParams.useResponsesApi,
    gpt5ChatLatestParams.disableStreaming,
  ],
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT4o}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt4oParams.chatGptLabel,
    gpt4oParams.promptPrefix,
    librechat.maxContextTokens,
    gpt4oParams.max_tokens,
    gpt4oParams.temperature,
    gpt4oParams.top_p,
    gpt4oParams.frequency_penalty,
    gpt4oParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt4oParams.reasoning_effort,
    gpt4oParams.reasoning_summary,
    gpt4oParams.verbosity,
    gpt4oParams.useResponsesApi,
    gpt4oParams.disableStreaming,
  ],
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.ChatGPT4oLatest}`]: [
    baseDefinitions.model as SettingDefinition,
    chatgpt4oLatestParams.chatGptLabel,
    chatgpt4oLatestParams.promptPrefix,
    librechat.maxContextTokens,
    chatgpt4oLatestParams.max_tokens,
    chatgpt4oLatestParams.temperature,
    chatgpt4oLatestParams.top_p,
    chatgpt4oLatestParams.frequency_penalty,
    chatgpt4oLatestParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    chatgpt4oLatestParams.reasoning_effort,
    chatgpt4oLatestParams.reasoning_summary,
    chatgpt4oLatestParams.verbosity,
    chatgpt4oLatestParams.useResponsesApi,
    chatgpt4oLatestParams.disableStreaming,
  ],
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT4oMini}`]: [
    baseDefinitions.model as SettingDefinition,
    gpt4oMiniParams.chatGptLabel,
    gpt4oMiniParams.promptPrefix,
    librechat.maxContextTokens,
    gpt4oMiniParams.max_tokens,
    gpt4oMiniParams.temperature,
    gpt4oMiniParams.top_p,
    gpt4oMiniParams.frequency_penalty,
    gpt4oMiniParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    baseDefinitions.imageDetail,
    gpt4oMiniParams.reasoning_effort,
    gpt4oMiniParams.reasoning_summary,
    gpt4oMiniParams.verbosity,
    gpt4oMiniParams.useResponsesApi,
    gpt4oMiniParams.disableStreaming,
  ],
  // DeepSeek model-specific parameter settings for custom endpoint
  [`${EModelEndpoint.custom}-${DeepSeekModelCategory.DeepSeekChat}`]: [
    baseDefinitions.model as SettingDefinition,
    deepSeekChatParams.promptPrefix,
    librechat.maxContextTokens,
    deepSeekChatParams.max_tokens,
    deepSeekChatParams.temperature,
    deepSeekChatParams.top_p,
    deepSeekChatParams.frequency_penalty,
    deepSeekChatParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    deepSeekChatParams.verbosity,
  ],
  [`${EModelEndpoint.custom}-${DeepSeekModelCategory.DeepSeekCoder}`]: [
    baseDefinitions.moel as SettingDefinition,
    deepSeekCoderParams.chatGptLabel,
    deepSeekCoderParams.promptPrefix,
    librechat.maxContextTokens,
    deepSeekCoderParams.max_tokens,
    deepSeekCoderParams.temperature,
    deepSeekCoderParams.top_p,
    deepSeekCoderParams.frequency_penalty,
    deepSeekCoderParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    deepSeekCoderParams.reasoning_effort,
    deepSeekCoderParams.reasoning_summary,
    deepSeekCoderParams.verbosity,
    deepSeekCoderParams.useResponsesApi,
    deepSeekCoderParams.disableStreaming,
  ],
  [`${EModelEndpoint.custom}-${DeepSeekModelCategory.DeepSeekReasoner}`]: [
    baseDefinitions.model as SettingDefinition,
    deepSeekReasonerParams.promptPrefix,
    librechat.maxContextTokens,
    deepSeekReasonerParams.max_tokens,
    deepSeekReasonerParams.temperature,
    deepSeekReasonerParams.top_p,
    deepSeekReasonerParams.frequency_penalty,
    deepSeekReasonerParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    deepSeekReasonerParams.reasoning_effort,
    deepSeekReasonerParams.reasoning_summary,
    deepSeekReasonerParams.verbosity,
  ],
  // DeepSeek endpoint specific configurations
  [`deepseek-${DeepSeekModelCategory.DeepSeekChat}`]: [
    baseDefinitions.model as SettingDefinition,
    deepSeekChatParams.chatGptLabel,
    deepSeekChatParams.promptPrefix,
    librechat.maxContextTokens,
    deepSeekChatParams.max_tokens,
    deepSeekChatParams.temperature,
    deepSeekChatParams.top_p,
    deepSeekChatParams.frequency_penalty,
    deepSeekChatParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    deepSeekChatParams.reasoning_effort,
    deepSeekChatParams.reasoning_summary,
    deepSeekChatParams.verbosity,
    deepSeekChatParams.useResponsesApi,
    deepSeekChatParams.disableStreaming,
  ],
  [`deepseek-${DeepSeekModelCategory.DeepSeekCoder}`]: [
    baseDefinitions.model as SettingDefinition,
    deepSeekCoderParams.chatGptLabel,
    deepSeekCoderParams.promptPrefix,
    librechat.maxContextTokens,
    deepSeekCoderParams.max_tokens,
    deepSeekCoderParams.temperature,
    deepSeekCoderParams.top_p,
    deepSeekCoderParams.frequency_penalty,
    deepSeekCoderParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    deepSeekCoderParams.reasoning_effort,
    deepSeekCoderParams.reasoning_summary,
    deepSeekCoderParams.verbosity,
    deepSeekCoderParams.useResponsesApi,
    deepSeekCoderParams.disableStreaming,
  ],
  [`deepseek-${DeepSeekModelCategory.DeepSeekReasoner}`]: [
    baseDefinitions.model as SettingDefinition,
    deepSeekReasonerParams.chatGptLabel,
    deepSeekReasonerParams.promptPrefix,
    librechat.maxContextTokens,
    deepSeekReasonerParams.max_tokens,
    deepSeekReasonerParams.temperature,
    deepSeekReasonerParams.top_p,
    deepSeekReasonerParams.frequency_penalty,
    deepSeekReasonerParams.presence_penalty,
    baseDefinitions.stop,
    librechat.resendFiles,
    deepSeekReasonerParams.reasoning_effort,
    deepSeekReasonerParams.reasoning_summary,
    deepSeekReasonerParams.verbosity,
    deepSeekReasonerParams.useResponsesApi,
    deepSeekReasonerParams.disableStreaming,
  ],
  // Claude model-specific parameter settings for anthropic endpoint
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.ClaudeOpus4_1}`]: [
    baseDefinitions.model as SettingDefinition,
    claudeOpus4_1Params.maxOutputTokens,
    claudeOpus4_1Params.temperature,
    claudeOpus4_1Params.topP,
    claudeOpus4_1Params.topK,
    baseDefinitions.stop,
    librechat.resendFiles,
    claudeOpus4_1Params.promptCache,
    claudeOpus4_1Params.thinking,
    claudeOpus4_1Params.thinkingBudget,
    claudeOpus4_1Params.web_search,
  ],
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.ClaudeOpus4}`]: [
    baseDefinitions.model as SettingDefinition,
    claudeOpus4Params.maxOutputTokens,
    claudeOpus4Params.temperature,
    claudeOpus4Params.topP,
    claudeOpus4Params.topK,
    baseDefinitions.stop,
    librechat.resendFiles,
    claudeOpus4Params.promptCache,
    claudeOpus4Params.thinking,
    claudeOpus4Params.thinkingBudget,
    claudeOpus4Params.web_search,
  ],
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.ClaudeSonnet4}`]: [
    baseDefinitions.model as SettingDefinition,
    claudeSonnet4Params.maxOutputTokens,
    claudeSonnet4Params.temperature,
    claudeSonnet4Params.topP,
    claudeSonnet4Params.topK,
    baseDefinitions.stop,
    librechat.resendFiles,
    claudeSonnet4Params.promptCache,
    claudeSonnet4Params.thinking,
    claudeSonnet4Params.thinkingBudget,
    claudeSonnet4Params.web_search,
  ],
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.Claude3_7Sonnet}`]: [
    baseDefinitions.model as SettingDefinition,
    claude3_7SonnetParams.maxOutputTokens,
    claude3_7SonnetParams.temperature,
    claude3_7SonnetParams.topP,
    claude3_7SonnetParams.topK,
    baseDefinitions.stop,
    librechat.resendFiles,
    claude3_7SonnetParams.promptCache,
    claude3_7SonnetParams.thinking,
    claude3_7SonnetParams.thinkingBudget,
    claude3_7SonnetParams.web_search,
  ],
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.Claude3_5Sonnet}`]: [
    baseDefinitions.model as SettingDefinition,
    claude3_5SonnetParams.maxOutputTokens,
    claude3_5SonnetParams.temperature,
    claude3_5SonnetParams.topP,
    claude3_5SonnetParams.topK,
    baseDefinitions.stop,
    librechat.resendFiles,
    claude3_5SonnetParams.promptCache,
    claude3_5SonnetParams.thinking,
    claude3_5SonnetParams.thinkingBudget,
    claude3_5SonnetParams.web_search,
  ],
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.Claude3Haiku}`]: [
    baseDefinitions.model as SettingDefinition,
    claude3HaikuParams.maxOutputTokens,
    claude3HaikuParams.temperature,
    claude3HaikuParams.topP,
    claude3HaikuParams.topK,
    baseDefinitions.stop,
    librechat.resendFiles,
    claude3HaikuParams.promptCache,
    claude3HaikuParams.thinking,
    claude3HaikuParams.thinkingBudget,
    claude3HaikuParams.web_search,
  ],
  [EModelEndpoint.anthropic]: anthropicConfig,
  [`${EModelEndpoint.bedrock}-${BedrockProviders.Anthropic}`]: bedrockAnthropic,
  [`${EModelEndpoint.bedrock}-${BedrockProviders.MistralAI}`]: bedrockMistral,
  [`${EModelEndpoint.bedrock}-${BedrockProviders.Cohere}`]: bedrockCohere,
  [`${EModelEndpoint.bedrock}-${BedrockProviders.Meta}`]: bedrockGeneral,
  [`${EModelEndpoint.bedrock}-${BedrockProviders.AI21}`]: bedrockGeneral,
  [`${EModelEndpoint.bedrock}-${BedrockProviders.Amazon}`]: bedrockGeneral,
  [`${EModelEndpoint.bedrock}-${BedrockProviders.DeepSeek}`]: bedrockGeneral,
  [EModelEndpoint.google]: googleConfig,
};

const openAIColumns = {
  col1: openAICol1,
  col2: openAICol2,
};

// Model-specific column configurations
const gpt5Columns = {
  col1: gpt5Col1,
  col2: gpt5Col2,
};

const gpt5MiniColumns = {
  col1: gpt5MiniCol1,
  col2: gpt5MiniCol2,
};

const gpt5NanoColumns = {
  col1: gpt5NanoCol1,
  col2: gpt5NanoCol2,
};

const gpt5ChatLatestColumns = {
  col1: gpt5ChatLatestCol1,
  col2: gpt5ChatLatestCol2,
};

const gpt4oColumns = {
  col1: gpt4oCol1,
  col2: gpt4oCol2,
};

const chatgpt4oLatestColumns = {
  col1: chatgpt4oLatestCol1,
  col2: chatgpt4oLatestCol2,
};

const gpt4oMiniColumns = {
  col1: gpt4oMiniCol1,
  col2: gpt4oMiniCol2,
};

// DeepSeek column configurations
const deepSeekChatColumns = {
  col1: deepSeekChatCol1,
  col2: deepSeekChatCol2,
};

const deepSeekCoderColumns = {
  col1: deepSeekCoderCol1,
  col2: deepSeekCoderCol2,
};

const deepSeekReasonerColumns = {
  col1: deepSeekReasonerCol1,
  col2: deepSeekReasonerCol2,
};

// Claude model-specific column configurations
const claudeOpus4_1Columns = {
  col1: claudeOpus4_1Col1,
  col2: claudeOpus4_1Col2,
};

const claudeOpus4Columns = {
  col1: claudeOpus4Col1,
  col2: claudeOpus4Col2,
};

const claudeSonnet4Columns = {
  col1: claudeSonnet4Col1,
  col2: claudeSonnet4Col2,
};

const claude3_7SonnetColumns = {
  col1: claude3_7SonnetCol1,
  col2: claude3_7SonnetCol2,
};

const claude3_5SonnetColumns = {
  col1: claude3_5SonnetCol1,
  col2: claude3_5SonnetCol2,
};

const claude3HaikuColumns = {
  col1: claude3HaikuCol1,
  col2: claude3HaikuCol2,
};

const bedrockGeneralColumns = {
  col1: bedrockGeneralCol1,
  col2: bedrockGeneralCol2,
};

export const presetSettings: Record<
  string,
  | {
      col1: SettingsConfiguration;
      col2: SettingsConfiguration;
    }
  | undefined
> = {
  [EModelEndpoint.openAI]: openAIColumns,
  [EModelEndpoint.azureOpenAI]: openAIColumns,
  [EModelEndpoint.custom]: openAIColumns,
  // Model-specific OpenAI settings
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT5}`]: gpt5Columns,
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT5Mini}`]: gpt5MiniColumns,
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT5Nano}`]: gpt5NanoColumns,
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT5ChatLatest}`]: gpt5ChatLatestColumns,
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT4o}`]: gpt4oColumns,
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.ChatGPT4oLatest}`]: chatgpt4oLatestColumns,
  [`${EModelEndpoint.openAI}-${OpenAIModelCategory.GPT4oMini}`]: gpt4oMiniColumns,
  // Azure OpenAI model-specific settings
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT5}`]: gpt5Columns,
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT5Mini}`]: gpt5MiniColumns,
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT5Nano}`]: gpt5NanoColumns,
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT5ChatLatest}`]: gpt5ChatLatestColumns,
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT4o}`]: gpt4oColumns,
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.ChatGPT4oLatest}`]: chatgpt4oLatestColumns,
  [`${EModelEndpoint.azureOpenAI}-${OpenAIModelCategory.GPT4oMini}`]: gpt4oMiniColumns,
  // Custom endpoint model-specific settings
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT5}`]: gpt5Columns,
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT5Mini}`]: gpt5MiniColumns,
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT5Nano}`]: gpt5NanoColumns,
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT5ChatLatest}`]: gpt5ChatLatestColumns,
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT4o}`]: gpt4oColumns,
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.ChatGPT4oLatest}`]: chatgpt4oLatestColumns,
  [`${EModelEndpoint.custom}-${OpenAIModelCategory.GPT4oMini}`]: gpt4oMiniColumns,
  // DeepSeek model-specific settings for custom endpoint
  [`${EModelEndpoint.custom}-${DeepSeekModelCategory.DeepSeekChat}`]: deepSeekChatColumns,
  [`${EModelEndpoint.custom}-${DeepSeekModelCategory.DeepSeekCoder}`]: deepSeekCoderColumns,
  [`${EModelEndpoint.custom}-${DeepSeekModelCategory.DeepSeekReasoner}`]: deepSeekReasonerColumns,
  // DeepSeek endpoint specific configurations
  [`deepseek-${DeepSeekModelCategory.DeepSeekChat}`]: deepSeekChatColumns,
  [`deepseek-${DeepSeekModelCategory.DeepSeekCoder}`]: deepSeekCoderColumns,
  [`deepseek-${DeepSeekModelCategory.DeepSeekReasoner}`]: deepSeekReasonerColumns,
  // Claude model-specific settings for anthropic endpoint
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.ClaudeOpus4_1}`]: claudeOpus4_1Columns,
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.ClaudeOpus4}`]: claudeOpus4Columns,
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.ClaudeSonnet4}`]: claudeSonnet4Columns,
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.Claude3_7Sonnet}`]: claude3_7SonnetColumns,
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.Claude3_5Sonnet}`]: claude3_5SonnetColumns,
  [`${EModelEndpoint.anthropic}-${ClaudeModelCategory.Claude3Haiku}`]: claude3HaikuColumns,
  [EModelEndpoint.anthropic]: {
    col1: anthropicCol1,
    col2: anthropicCol2,
  },
  [`${EModelEndpoint.bedrock}-${BedrockProviders.Anthropic}`]: {
    col1: bedrockAnthropicCol1,
    col2: bedrockAnthropicCol2,
  },
  [`${EModelEndpoint.bedrock}-${BedrockProviders.MistralAI}`]: {
    col1: bedrockMistralCol1,
    col2: bedrockMistralCol2,
  },
  [`${EModelEndpoint.bedrock}-${BedrockProviders.Cohere}`]: {
    col1: bedrockCohereCol1,
    col2: bedrockCohereCol2,
  },
  [`${EModelEndpoint.bedrock}-${BedrockProviders.Meta}`]: bedrockGeneralColumns,
  [`${EModelEndpoint.bedrock}-${BedrockProviders.AI21}`]: bedrockGeneralColumns,
  [`${EModelEndpoint.bedrock}-${BedrockProviders.Amazon}`]: bedrockGeneralColumns,
  [`${EModelEndpoint.bedrock}-${BedrockProviders.DeepSeek}`]: bedrockGeneralColumns,
  [EModelEndpoint.google]: {
    col1: googleCol1,
    col2: googleCol2,
  },
};

export const agentParamSettings: Record<string, SettingsConfiguration | undefined> = Object.entries(
  presetSettings,
).reduce<Record<string, SettingsConfiguration | undefined>>((acc, [key, value]) => {
  if (value) {
    acc[key] = value.col2;
  }
  return acc;
}, {});
