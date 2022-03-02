import * as jose from 'jose'

const publicKey: string = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAkP36eIiGqmH94L7jk/xm
e0HBvV4ff3+bjMBvdKWajM/yfplIu+XSprJ8ZDDtosB0lSybBeDl2Dxv4gzitnR2
VxGkZ5y/Em5loLhAFMPfRDiJn9+TlVK+XTTSKuoF/GnZSavdC56G+7ay4U5XhD1r
CirEqUwafQucz+NWm1L/ARu0JwqyO708xiYBxBDv3FUDkNXA2e3nDXb31/oZVPtY
5l4kI9UfnqQUF/hpHStIx3Jl9iVjTA0HWfRipPATD+lVFDMmEHlNRr9487UamLYr
V87JndnLiEircjXlXksxnG+DLvna7YEnzXAofPjCRVESdwKhlCoK/uOgXPNwRRF2
IDmNn4ogCUeWeorZWzupgeCcSuE89ihVQbzOIfQgOmYIAhg659n0WSG+zXnJpdCX
R1o+DdFPDUWoHbbC5vXmwhaCUWAyBkUWqOc6k4fXak4t+YC+wlvyOaUthqo7ywxJ
SncYdtExQcphXXia/PNivSw6hVmvDtEpGTYWmfKTowSk9K/uRigfRYXEaq3SMWhC
sTJuc4R+zEzERVknMV9Z2/+tTznIBt5mq7080Hxh0shhQfd27i+VonQhTiAopkgY
9rhkkXVO7T1QYRZzX9gm9UDMHNO6ejUmofJ0hbuhVngG+s8G+9rbI3j5aWd777PV
xxJRBThnwoCXHPhZ1JnoAW0CAwEAAQ==
-----END PUBLIC KEY-----`
const getPublicKey = async () => await jose.importSPKI(publicKey, 'RS256')

class AuthService {
  async getProfile(): Promise<jose.JWTPayload | null> {
    const token: string | null = this.getToken()
    const payload = token ? this.verify(token).then((result) => result.payload) : null
    return payload
  }

  loggedIn(): boolean {
    // Checks if there is a saved token and it's still valid
    const token: string | null = this.getToken()
    return !!token && !this.isTokenExpired(token)
  }

  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const decoded = await jose.jwtVerify(token, getPublicKey)
      if (decoded?.payload?.exp ? decoded.payload.exp < Date.now() / 1000 : false) {
        return true
      } else return false
    } catch (err) {
      return false
    }
  }

  async verify(token: string) {
    return await jose.jwtVerify(token, getPublicKey)
  }

  getToken(): string | null {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token') || null;
  }

  login(idToken: string, userId: string): void {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
    localStorage.setItem('userId', userId)

    window.location.assign('/')
  }

  logout(): void {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('userId')

    // this will reload the page and reset the state of the application
    window.location.assign('/')
  }
}

export default new AuthService()