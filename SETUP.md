# Setup Guide - Billennium Divas

Follow these steps to get your application fully configured and running.

## ✅ Completed Steps

1. ✅ Dependencies installed (Supabase, Sanity packages)
2. ✅ Environment variables configured with Supabase URL and anon key
3. ✅ Supabase client configurations created
4. ✅ Database schema types defined
5. ✅ Sanity CMS schemas created
6. ✅ Authentication utilities implemented
7. ✅ File storage utilities created
8. ✅ API routes for startups and profiles

## 🔧 Next Steps

### 1. Complete Environment Variables

You still need to add:

**Supabase Service Role Key**:
- Go to Supabase Dashboard → Project Settings → API
- Click "Reveal" on the service_role key
- Copy and add to `.env.local`:
```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Sanity Credentials**:
- Go to [Sanity.io](https://www.sanity.io/manage)
- Create a new project or use existing
- Get your Project ID and Dataset name
- Create an API token with Editor permissions
- Add to `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

### 2. Set Up Database Schema

Run the SQL schema in your Supabase project:

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Open the file `supabase-schema.sql` from your project
4. Copy all contents
5. Paste into SQL Editor
6. Click "Run" to execute

This will create:
- All database tables (profiles, startups, mentors, investors, applications)
- Row Level Security policies
- Storage buckets (pitch-decks, avatars, logos)
- Indexes and triggers

### 3. Configure OAuth Providers (Optional but Recommended)

**Google OAuth**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI:
   ```
   https://hkxgdrjuvlxwvmulzgco.supabase.co/auth/v1/callback
   ```
6. Copy Client ID and Client Secret
7. In Supabase Dashboard → Authentication → Providers → Google
8. Paste credentials and enable

**LinkedIn OAuth**:
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Add redirect URL:
   ```
   https://hkxgdrjuvlxwvmulzgco.supabase.co/auth/v1/callback
   ```
4. Request access to Sign In with LinkedIn using OpenID Connect
5. Copy Client ID and Client Secret
6. In Supabase Dashboard → Authentication → Providers → LinkedIn
7. Paste credentials and enable

### 4. Initialize Sanity Studio

Once you have Sanity credentials in `.env.local`:

```bash
npm run dev
```

Visit `http://localhost:3000/studio` to access the Sanity Studio interface.

First time setup:
1. You'll be prompted to log in to Sanity
2. Grant permissions to the studio
3. Start creating content!

### 5. Test the Integration

**Test Authentication**:
```bash
# Create a test registration page or use Supabase Auth UI
```

**Test Database**:
```bash
# Try creating a profile through the API
curl http://localhost:3000/api/profile
```

**Test Storage**:
```bash
# Upload a test file through your app
```

**Test CMS**:
1. Go to http://localhost:3000/studio
2. Create a blog post
3. Publish it
4. Verify it appears on your site

### 6. Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Import Project"
4. Select your GitHub repository
5. Add all environment variables from `.env.local`
6. Click "Deploy"

**Important**: Make sure to add ALL environment variables in Vercel:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- SANITY_API_TOKEN

### 7. Post-Deployment Configuration

**Update Supabase Auth URLs**:
1. Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel domain:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`

**Configure Sanity CORS**:
1. Sanity Dashboard → API → CORS Origins
2. Add your domains:
   - `http://localhost:3000` (development)
   - `https://your-app.vercel.app` (production)

## 🎯 Features Ready to Use

Once setup is complete, you'll have:

✅ User registration and login (email/password + OAuth)
✅ Role-based access control (member, admin, investor, mentor)
✅ Protected routes and middleware
✅ Database with startups, mentors, investors
✅ File uploads (pitch decks, avatars, logos)
✅ CMS for blog posts, events, testimonials
✅ Type-safe database operations
✅ API routes for CRUD operations

## 📚 Need Help?

- Check `README.md` for detailed documentation
- Review `supabase-schema.sql` for database structure
- Explore `src/types/database.ts` for TypeScript types
- Look at example API routes in `src/app/api/`

## 🔒 Security Checklist

- [ ] `.env.local` is in `.gitignore` (already done)
- [ ] Service role key is never exposed to client
- [ ] Row Level Security policies are active
- [ ] OAuth redirect URLs are configured correctly
- [ ] CORS origins are restricted in Sanity
- [ ] Rate limiting is considered for auth endpoints
- [ ] Input validation is implemented

## 🚀 You're All Set!

Once you complete these steps, your application will be fully functional with:
- Secure authentication
- Database operations
- File storage
- Content management
- Ready for production deployment
