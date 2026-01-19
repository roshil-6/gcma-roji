'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Submission {
  id: string
  type: string
  data: Record<string, any>
  submittedAt: string
  status?: 'pending' | 'reviewed' | 'resolved'
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchSubmissions()
  }, [selectedType])

  const fetchSubmissions = async () => {
    setIsLoading(true)
    try {
      const url = selectedType === 'all' 
        ? '/api/admin/submissions'
        : `/api/admin/submissions?type=${selectedType}`
      
      const response = await fetch(url)
      
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }

      const data = await response.json()
      if (data.submissions) {
        setSubmissions(data.submissions)
      } else {
        setError(data.error || 'Failed to load submissions')
      }
    } catch (error) {
      setError('Failed to load submissions')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const updateStatus = async (type: string, id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, id, status }),
      })

      if (response.ok) {
        fetchSubmissions()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteSubmission = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/submissions?type=${type}&id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchSubmissions()
      }
    } catch (error) {
      console.error('Error deleting submission:', error)
    }
  }

  const formatType = (type: string) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'reviewed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
    }
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      {/* Back to Home Link */}
      <div className="max-w-7xl mx-auto mb-4">
        <Link 
          href="/" 
          className="text-sm text-gray-500 hover:text-gold-metallic transition-colors inline-block"
        >
          ← back to home
        </Link>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gold-metallic mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-300">
                View and manage form submissions
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-gold-outline"
            >
              Logout
            </button>
          </div>

          {/* Filter */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gold-metallic mb-2">
              Filter by Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-input appearance-none bg-black/80 text-white cursor-pointer max-w-xs"
            >
              <option value="all">All Submissions</option>
              <option value="immigration-fraud">Immigration Fraud</option>
              <option value="medical-assistance">Medical Assistance</option>
              <option value="education-support">Education Support</option>
              <option value="bts-student">BTS Student</option>
              <option value="bts-tutor">BTS Tutor</option>
            </select>
          </div>
        </div>

        {/* Submissions List */}
        {isLoading ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-gold-metallic">Loading submissions...</p>
          </div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-gray-300">No submissions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="glass-card rounded-2xl p-6 hover:border-gold-metallic/60 transition-all"
              >
                <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gold-metallic">
                        {formatType(submission.type)}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          submission.status
                        )}`}
                      >
                        {submission.status || 'pending'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={submission.status || 'pending'}
                      onChange={(e) =>
                        updateStatus(submission.type, submission.id, e.target.value)
                      }
                      className="form-input appearance-none bg-black/80 text-white cursor-pointer text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <button
                      onClick={() => deleteSubmission(submission.type, submission.id)}
                      className="btn-gold-outline text-sm px-4"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Submission Data */}
                <div className="bg-black/30 rounded-lg p-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(submission.data).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-gold-metallic/70 uppercase mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-gray-300 break-words">
                          {typeof value === 'object' && value !== null
                            ? JSON.stringify(value)
                            : String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
