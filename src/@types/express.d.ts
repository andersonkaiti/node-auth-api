declare namespace Express {
  interface Request {
    metadata?: {
      account?: {
        accountId: string
        role: 'ADMIN' | 'USER'
      }
    }
  }
}
