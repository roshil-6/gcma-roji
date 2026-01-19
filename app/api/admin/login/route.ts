import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // Admin password - Set ADMIN_PASSWORD in .env.local to override
    const adminPassword = process.env.ADMIN_PASSWORD || 'Senora@2024'

    if (password === adminPassword) {
      const cookieStore = await cookies()
      cookieStore.set('admin-auth', adminPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days - admin stays logged in
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies()
  cookieStore.delete('admin-auth')
  return NextResponse.json({ success: true })
}
