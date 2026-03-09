# Youth IMS Setup Instructions

## Step 1: Configure Environment Variables

Set the required variables in your `.env` file:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_BETTER_AUTH_URL`
- `RESEND_API_KEY`
- `EMAIL_SENDER_NAME`
- `EMAIL_SENDER_ADDRESS`

## Step 2: Apply Database Schema

Run:

```bash
npm run db:push
```

## Step 3: Seed Initial Data (Optional)

Run:

```bash
npm run db:seed
```

## Step 4: Create the First Admin User

Create the first user through the app, then assign the `admin` role directly in the database if needed.

## User Roles

- `admin`: full access
- `data_entry`: can create/update dataset records
- `viewer`: read-only access

## Troubleshooting

- Confirm the app can connect to `DATABASE_URL`.
- Confirm Better Auth URLs are correct for your environment.
- Confirm email sender variables are valid so verification emails can be delivered.
