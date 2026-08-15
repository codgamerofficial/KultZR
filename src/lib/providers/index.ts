import { FulfillmentProvider } from './types';
import { QikinkProvider } from './qikink';

let activeProvider: FulfillmentProvider = new QikinkProvider();

export function getFulfillmentProvider(): FulfillmentProvider {
  return activeProvider;
}

export function setFulfillmentProvider(provider: FulfillmentProvider) {
  activeProvider = provider;
}

export * from './types';
export * from './qikink';
