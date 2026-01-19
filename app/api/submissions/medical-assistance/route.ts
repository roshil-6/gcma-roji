import { NextRequest, NextResponse } from 'next/server'
import { saveSubmission } from '@/lib/submissions'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const data: Record<string, any> = {}

    formData.forEach((value, key) => {
      if (value instanceof File) {
        data[key] = {
          filename: value.name,
          size: value.size,
          type: value.type
        }
      } else {
        data[key] = value
      }
    })

    const submission = saveSubmission('medical-assistance', data)

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
      id: submission.id 
    })
  } catch (error) {
    console.error('Error saving submission:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
