# Admin Panel Setup Guide

## Overview
The admin panel allows you to view and manage all form submissions directly from your website. All data is stored locally in JSON files.

## Accessing the Admin Panel

1. Click on the small "admin login" link in the footer (bottom of any page)
2. Or navigate directly to: `http://localhost:3001/admin/login`
3. Enter the admin password
4. You'll be redirected to the dashboard

## Admin Password

- **Default Password:** `Senora@2024`
- To change the password, create or update `.env.local` file:
  ```env
  ADMIN_PASSWORD=your_secure_password_here
  ```
- Restart your development server after changing the password
- **Note:** The password is not visible to regular users

## Features

### Dashboard
- View all form submissions
- Filter submissions by type
- Update submission status (Pending, Reviewed, Resolved)
- Delete submissions
- See submission details in an organized format

### Submission Types
- **Immigration Fraud** - Fraud complaint submissions
- **Medical Assistance** - Medical assistance applications
- **Education Support** - Educational support applications
- **BTS Student** - Break the Silence student applications
- **BTS Tutor** - Break the Silence tutor applications

## Data Storage

All submissions are stored permanently in JSON files in the `/data` directory:
- `immigration-fraud.json`
- `medical-assistance.json`
- `education-support.json`
- `bts-student.json`
- `bts-tutor.json`

**Important:**
- Data is **permanently stored** and will persist across days
- Submissions are **never auto-deleted** - they remain available until manually deleted by admin
- The `/data` directory is in `.gitignore` to keep submissions private
- Admin can view all historical submissions from any day

## Security

- Simple password-based authentication
- Session stored in HTTP-only cookies
- For production, consider:
  - Using a stronger password
  - Implementing more robust authentication
  - Adding rate limiting
  - Using a proper database instead of JSON files

## Troubleshooting

**Can't access admin panel:**
- Make sure you're logged in at `/admin/login`
- Check that the password is correct
- Clear browser cookies and try again

**Submissions not showing:**
- Check that forms are submitting successfully
- Verify the `/data` directory exists and has proper permissions
- Check browser console for errors

**Data not persisting:**
- Ensure the `/data` directory is writable
- Check file permissions
- Verify the server has write access

## Production Considerations

For production deployment:
1. Set a strong `ADMIN_PASSWORD` in environment variables
2. Consider using a database (PostgreSQL, MongoDB, etc.) instead of JSON files
3. Implement proper authentication (JWT, OAuth, etc.)
4. Add rate limiting to prevent abuse
5. Set up regular backups of submission data
