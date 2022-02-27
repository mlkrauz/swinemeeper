import { decode, JwtPayload } from 'jsonwebtoken'

class AuthService {
  getProfile(): JwtPayload | null {
    const token: string | null = this.getToken()
    return token ? decode(token, { json: true }) : null
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token: string | null = this.getToken()
    return !!token && !this.isTokenExpired(token)
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: JwtPayload | null = decode(token, { json: true });
      if (decoded?.exp ? decoded.exp < Date.now() / 1000 : false) {
        return true
      } else return false
    } catch (err) {
      return false
    }
  }

  getToken(): string | null {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token') || null;
  }

  login(idToken: string) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/')
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    // this will reload the page and reset the state of the application
    window.location.assign('/')
  }
}

export default new AuthService()