import { NextRequest, NextResponse } from 'next/server'
import { saveSubmission } from '@/lib/submissions'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const data: Record<string, any> = {}

    // Extract form fields
    formData.forEach((value, key) => {
      if (value instanceof File) {
        // For files, store the filename and size
        data[key] = {
          filename: value.name,
          size: value.size,
          type: value.type
        }
      } else {
        data[key] = value
      }
    })

    const submission = saveSubmission('immigration-fraud', data)

    return NextResponse.json({ 
      success: true, 
      message: 'Complaint submitted successfully',
      id: submission.id 
    })
  } catch (error) {
    console.error('Error saving submission:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit complaint' },
      { status: 500 }
    )
  }
}
