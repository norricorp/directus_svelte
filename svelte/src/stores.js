import { writable } from 'svelte/store'


export const authToken = writable('')
export const refreshToken = writable('')
export const userId = writable(0)
export const emailName = writable('')
export const authenticated = writable(false)
export const fullName = writable('')

