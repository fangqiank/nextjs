# Setup

You'll need to set up both a Postgres database and a Clerk application.

## Database Setup

using Neon

```sql
CREATE TABLE bookmarks
(
  userId VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT constraint_name UNIQUE (userId, slug)
);
```



## Clerk Setup

- Create a free [Clerk account](https://clerk.dev/) and connect it to whatever authorization sources you want to use
- Modify the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` variables in the `.env.local` file to match your Clerk setup.

## Running the Microservice and App

```bash
cd slug-api
pnpm i
pnpm start
```

In another terminal session:

```bash
cd slug-city
pnpm i
pnpm dev
```
