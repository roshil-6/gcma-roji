import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

export type SubmissionType = 
  | 'immigration-fraud'
  | 'medical-assistance'
  | 'education-support'
  | 'bts-student'
  | 'bts-tutor'

export interface Submission {
  id: string
  type: SubmissionType
  data: Record<string, any>
  submittedAt: string
  status?: 'pending' | 'reviewed' | 'resolved'
}

const getFilePath = (type: SubmissionType) => {
  return path.join(DATA_DIR, `${type}.json`)
}

export function saveSubmission(type: SubmissionType, data: Record<string, any>): Submission {
  const submission: Submission = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    data,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  }

  const filePath = getFilePath(type)
  let submissions: Submission[] = []

  // Read existing submissions
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      submissions = JSON.parse(fileContent)
    } catch (error) {
      console.error('Error reading submissions file:', error)
      submissions = []
    }
  }

  // Add new submission
  submissions.push(submission)

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), 'utf-8')

  return submission
}

export function getSubmissions(type?: SubmissionType): Submission[] {
  if (type) {
    const filePath = getFilePath(type)
    if (!fs.existsSync(filePath)) {
      return []
    }
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(fileContent)
    } catch (error) {
      console.error('Error reading submissions file:', error)
      return []
    }
  } else {
    // Get all submissions from all types
    const allSubmissions: Submission[] = []
    const types: SubmissionType[] = [
      'immigration-fraud',
      'medical-assistance',
      'education-support',
      'bts-student',
      'bts-tutor'
    ]

    types.forEach(t => {
      const filePath = getFilePath(t)
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8')
          const submissions = JSON.parse(fileContent)
          allSubmissions.push(...submissions)
        } catch (error) {
          console.error(`Error reading ${t} submissions:`, error)
        }
      }
    })

    return allSubmissions.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    )
  }
}

export function updateSubmissionStatus(
  type: SubmissionType,
  id: string,
  status: 'pending' | 'reviewed' | 'resolved'
): boolean {
  const filePath = getFilePath(type)
  if (!fs.existsSync(filePath)) {
    return false
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const submissions: Submission[] = JSON.parse(fileContent)
    const submission = submissions.find(s => s.id === id)
    
    if (submission) {
      submission.status = status
      fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), 'utf-8')
      return true
    }
    return false
  } catch (error) {
    console.error('Error updating submission:', error)
    return false
  }
}

export function deleteSubmission(type: SubmissionType, id: string): boolean {
  const filePath = getFilePath(type)
  if (!fs.existsSync(filePath)) {
    return false
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const submissions: Submission[] = JSON.parse(fileContent)
    const filtered = submissions.filter(s => s.id !== id)
    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Error deleting submission:', error)
    return false
  }
}
