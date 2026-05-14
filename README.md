# BEE Lab Video Archive

Video archive for BGCTUB CSE Department BEE Laboratory.

## Stack
- Next.js 14 App Router (TypeScript)
- Tailwind CSS · Syne + Onest + JetBrains Mono
- Neon (PostgreSQL) + Drizzle ORM
- JWT-based admin authentication

## Quick Start

```bash
pnpm install
cp .env.example .env.local   # fill in your values
pnpm db:push                 # push schema to Neon
pnpm dev                     # open http://localhost:3000
```

## Admin Panel

Visit `/admin/login` and enter your `ADMIN_PASSWORD`.

## Uploading Videos

See `videos/README.md` for detailed instructions.

## Deploy

Push to GitHub → connect repo on Vercel → add env vars → deploy.
