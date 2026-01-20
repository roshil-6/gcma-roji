import { NextRequest, NextResponse } from 'next/server'
import { saveSubmission } from '@/lib/submissions'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const submission = saveSubmission('contact', data)

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      id: submission.id 
    })
  } catch (error) {
    console.error('Error saving contact submission:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
