import { setGreeting2 } from '..'
import { storage, Context } from 'near-sdk-as'

describe('Greeting ', () => {
  it('should be set and read', () => {
    setGreeting2('hello world')
    storage.get<string>(Context.sender)
  })
})
