# Nexus Vest Website
A premium institutional DeFi platform built with Next.js, Tailwind, Firebase, and Power BI.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Environment:
   Copy `.env.example` to `.env.local` and fill in your keys.

   Required for Power BI:
   - `NEXT_PUBLIC_PBI_REPORT_ID`
   - `NEXT_PUBLIC_PBI_EMBED_URL`
   - `NEXT_PUBLIC_PBI_ACCESS_TOKEN`

3. Run Development Server:
   ```bash
   npm run dev
   ```

## Stack

- **Framework**: Next.js 14 (App Router)
- **Auth & DB**: Firebase
- **Blockchain**: Ethers.js
- **Analytics**: Power BI Embedded
