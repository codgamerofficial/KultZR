export type TaskType = 
  | 'QUICK_SEARCH' 
  | 'DEEP_RESEARCH' 
  | 'SIMPLE_EXTRACTION' 
  | 'VISION_SEARCH' 
  | 'SHOPPING_MISSION';

export interface ModelSelection {
  modelName: string;
  provider: 'TOKENROUTER' | 'LOCAL_PARSER';
  tier: 'FAST' | 'REASONING' | 'VISION' | 'LOCAL';
  estimatedCostPer1kTokens: number;
}

export const TOKENROUTER_MODELS = {
  fast: process.env.DEALSATHI_FAST_MODEL || 'qwen/qwen3.8-max-free',
  reasoning: process.env.DEALSATHI_REASONING_MODEL || 'deepseek/deepseek-v4-pro-0813',
  vision: process.env.DEALSATHI_VISION_MODEL || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
};

export class ModelRouter {
  selectModel(taskType: TaskType): ModelSelection {
    switch (taskType) {
      case 'QUICK_SEARCH':
      case 'SIMPLE_EXTRACTION':
        return {
          modelName: TOKENROUTER_MODELS.fast,
          provider: 'TOKENROUTER',
          tier: 'FAST',
          estimatedCostPer1kTokens: 0.0001,
        };
      case 'DEEP_RESEARCH':
      case 'SHOPPING_MISSION':
        return {
          modelName: TOKENROUTER_MODELS.reasoning,
          provider: 'TOKENROUTER',
          tier: 'REASONING',
          estimatedCostPer1kTokens: 0.0008,
        };
      case 'VISION_SEARCH':
        return {
          modelName: TOKENROUTER_MODELS.vision,
          provider: 'TOKENROUTER',
          tier: 'VISION',
          estimatedCostPer1kTokens: 0.0003,
        };
    }
  }
}

export const defaultModelRouter = new ModelRouter();
