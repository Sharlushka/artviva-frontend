// use this!
const setStoredUser = (user) => window.localStorage.setItem('user', JSON.stringify(user))
const getStoredUser = () => JSON.parse(window.localStorage.getItem('user'))
const removeStoredUser = () => window.localStorage.removeItem('user')

export default { getStoredUser, setStoredUser, removeStoredUser }
