/**
 * A simple promise that resolves after a given time
 * @example
 * async function test() {
 *   console.log('before wait')
 *   await wait(1000)
 *   console.log('waited 1 second')
 * }
 */
export function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
