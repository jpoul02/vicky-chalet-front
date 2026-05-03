'use server'

export async function verifyPin(pin: string): Promise<boolean> {
  const validPin = process.env.AUTH_PIN
  if (!validPin) return false
  return pin === validPin
}
