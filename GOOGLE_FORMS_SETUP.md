# Google Forms Integration Setup

## Overview
All forms now redirect to Google Forms for submission. Responses will be automatically saved in Google Sheets.

## Forms That Need Google Forms

1. **Immigration Fraud Complaint Form**
   - Environment variable: `NEXT_PUBLIC_IMMIGRATION_FORM_URL`
   - Default: Will redirect to placeholder URL

2. **Medical Assistance Request Form**
   - Environment variable: `NEXT_PUBLIC_MEDICAL_FORM_URL`
   - Default: Will redirect to placeholder URL

3. **Education Support Request Form**
   - Environment variable: `NEXT_PUBLIC_EDUCATION_FORM_URL`
   - Default: Will redirect to placeholder URL

4. **BTS Student Application**
   - Environment variable: `NEXT_PUBLIC_BTS_STUDENT_FORM_URL`
   - Default: Will redirect to placeholder URL

5. **BTS Tutor Application**
   - Environment variable: `NEXT_PUBLIC_BTS_TUTOR_FORM_URL`
   - Default: Will redirect to placeholder URL

6. **Migration Scam Report Form**
   - Environment variable: `NEXT_PUBLIC_MIGRATION_SCAM_FORM_URL`
   - Default: Will redirect to placeholder URL

## Setup Steps

### Step 1: Create Google Forms

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form for each form type listed above
3. Add fields matching your form requirements
4. Get the form URL (Share > Get link)

### Step 2: Configure Environment Variables

Create or update `.env.local` file:

```env
# Google Forms URLs
NEXT_PUBLIC_IMMIGRATION_FORM_URL=https://forms.google.com/d/e/YOUR_FORM_ID/viewform
NEXT_PUBLIC_MEDICAL_FORM_URL=https://forms.google.com/d/e/YOUR_FORM_ID/viewform
NEXT_PUBLIC_EDUCATION_FORM_URL=https://forms.google.com/d/e/YOUR_FORM_ID/viewform
NEXT_PUBLIC_BTS_STUDENT_FORM_URL=https://forms.google.com/d/e/YOUR_FORM_ID/viewform
NEXT_PUBLIC_BTS_TUTOR_FORM_URL=https://forms.google.com/d/e/YOUR_FORM_ID/viewform
NEXT_PUBLIC_MIGRATION_SCAM_FORM_URL=https://forms.google.com/d/e/YOUR_FORM_ID/viewform
```

Replace `YOUR_FORM_ID` with actual Google Form IDs.

### Step 3: How It Works

- User fills out form on your website
- Clicks "Submit" button
- Form opens Google Form in new tab
- User completes submission on Google Form
- Response automatically saved to Google Sheets

## Alternative: Embed Google Forms

If you prefer to embed Google Forms directly in your website instead of redirecting:

1. Get embed code from Google Form (Send > Embed HTML)
2. Replace the form component with embedded Google Form
3. This keeps users on your website

## Benefits

✅ **Free** - No cost  
✅ **Automatic Storage** - Responses in Google Sheets  
✅ **Easy Management** - View all submissions in one place  
✅ **Email Notifications** - Get notified of new submissions  
✅ **No Backend Required** - Everything handled by Google  

## Where Responses Are Stored

All responses are automatically saved in **Google Sheets**:
- Each form has its own Google Sheet
- View all submissions in real-time
- Export data as needed
- Set up email notifications
