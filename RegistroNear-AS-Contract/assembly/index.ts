
import { Context, logging, storage } from 'near-sdk-as'

const DEFAULT_MESSAGE = 'Hello'

export function getGreeting2(accountId: string): string | null {
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function setGreeting2(message: string): void {
  const accountId = Context.sender
  logging.log(`Saving greeting "${message}" for account "${accountId}"`)
  storage.set(accountId, message)
}

