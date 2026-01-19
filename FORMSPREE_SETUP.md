# Formspree Integration Setup Guide

## Overview
All forms are now integrated with Formspree for form submission. Formspree handles form submissions and sends email notifications.

## Setup Steps

### Step 1: Create Formspree Forms

1. Go to [Formspree](https://formspree.io) and sign up/login
2. Create a new form for each form type:
   - Immigration Fraud Complaint Form
   - Medical Assistance Form
   - Education Support Form
   - Break the Silence – Student Form
   - Break the Silence – Tutor Form
3. Copy the Form ID for each form (it looks like: `xvgkqjpn`)

### Step 2: Configure Environment Variables

Create or update `.env.local` file in your project root:

```env
# Formspree Form IDs
NEXT_PUBLIC_IMMIGRATION_FORMSPREE_ID=your_immigration_form_id
NEXT_PUBLIC_MEDICAL_FORMSPREE_ID=your_medical_form_id
NEXT_PUBLIC_EDUCATION_FORMSPREE_ID=your_education_form_id
NEXT_PUBLIC_BTS_STUDENT_FORMSPREE_ID=your_bts_student_form_id
NEXT_PUBLIC_BTS_TUTOR_FORMSPREE_ID=your_bts_tutor_form_id
```

Replace `your_*_form_id` with the actual Formspree form IDs you copied.

### Step 3: Restart Development Server

After updating `.env.local`, restart your Next.js development server:

```bash
npm run dev
```

## Form Field Names

The forms use the following field names that will appear in your Formspree submissions:

### Immigration Fraud Complaint Form
- `fullName`
- `contactNumber`
- `agencyName`
- `agencyLocation`
- `description`
- `evidence` (file upload)

### Medical Assistance Form
- `applicantName`
- `contactNumber`
- `doctorName`
- `hospitalName`
- `caseDescription`
- `medicalCertificate` (file upload, optional)

### Education Support Form
- `studentName`
- `contactNumber`
- `educationLevel`
- `schoolName`
- `supportRequirement`

### Break the Silence – Student Form
- `name`
- `contactNumber`
- `learningGoals`

### Break the Silence – Tutor Form
- `name`
- `contactNumber`
- `areaOfExpertise`
- `availability`

## Features

- ✅ Silent form submission (no page redirect)
- ✅ Success/error messages
- ✅ Form validation
- ✅ File upload support
- ✅ Loading states during submission
- ✅ Automatic form reset after successful submission

## Testing

1. Fill out a test form on your website
2. Submit the form
3. Check your Formspree dashboard for the submission
4. Verify email notifications (if configured in Formspree)
5. Ensure success message appears on your website

## Troubleshooting

**Form doesn't submit:**
- Verify Formspree form IDs are correct in `.env.local`
- Check browser console for errors
- Ensure `.env.local` file is in the project root
- Restart the development server after updating environment variables

**Success message doesn't appear:**
- Check that the form submission was successful in Formspree dashboard
- Verify network requests in browser DevTools

**File uploads not working:**
- Ensure your Formspree plan supports file uploads
- Check file size limits in Formspree settings

## Notes

- Formspree free plan includes 50 submissions per month
- File uploads require a paid plan or specific configuration
- All form data is sent securely to Formspree
- No user data is stored on your website
