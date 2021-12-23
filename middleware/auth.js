export default async function({store}) {
    await store.dispatch('auth/onAuth')
    console.log('onAuth is dispatched.')
}