# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js 16 (App Router) e-commerce store with Prisma/PostgreSQL, NextAuth v5, Cloudinary image hosting, ePayco payments (Colombian gateway), and Resend transactional email. Package manager: pnpm.

## Commands

```bash
pnpm dev              # dev server (localhost:3000)
pnpm build            # production build
pnpm start            # run production build
pnpm seed             # seed DB via prisma/seed.ts
pnpm prettier         # format all files
pnpm prettier:check   # check formatting only
pnpm dlx prisma migrate dev --name <name>   # create/apply a migration
pnpm dlx prisma generate                    # regenerate client (outputs to src/generated/prisma, not committed)
```

No lint or test scripts exist. There is no `.env` example beyond `.env.example` — required vars: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_EPAYCO_KEY`, `NEXT_PUBLIC_EPAYCO_PRIVATE_KEY`, `RESEND_API_KEY`, `VERCEL_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

## Architecture

**Route groups** under `app/` split the site by audience, each with its own `layout.tsx`:
- `(marketing)` — public landing/about/contact
- `(shop)` — product browsing, cart, checkout, payment, order confirmation
- `(auth)` — login/register
- `(user)` — authenticated customer dashboard (profile, addresses, purchases, security)
- `(admin)` — admin dashboard (products, orders, users, contacts)
- `api/auth/[...nextauth]` is the only route handler; everything else is Server Components/Server Actions.

**Source lives in `src/`, not colocated in `app/`.** Path aliases (see `tsconfig.json`) map to this structure:
| Alias | Path | Purpose |
|---|---|---|
| `@actions/*` | `src/actions` | Server actions, one subfolder per domain (`order`, `product`, `admin/*`, `epayco`, etc.) — this is where mutations and DB writes happen, not in route files |
| `@components/*` | `src/components` | UI, split into `admin/`, `shop/`, `user/`, `auth/`, `general/`, plus cross-cutting `shop-and-admin/` and `shop-and-user/` |
| `@ui/*` | `src/components/ui` | shadcn/ui primitives (style "new-york", base color slate) |
| `@schema/*` | `src/schema` | Zod validation schemas, shared between forms and server actions |
| `@store/*` | `src/store` | Zustand stores (cart, address form/address) |
| `@lib/*`, `@utils/*`, `@config/*`, `@consts/*`, `@data/*`, `@providers/*`, `@email/*` | `src/{lib,utils,config,consts,data,providers,email}` | |
| `@prisma/*` | `src/generated/prisma` | generated Prisma client output (not the `prisma/` folder at repo root, which holds `schema.prisma`/`seed.ts`) |

**Auth**: `src/auth.config.ts` holds the NextAuth v5 config; role is `admin`/`user` on the `User` model and gates the `(admin)` route group.

**Data model** (`prisma/schema.prisma`): `User` → `UserAddress`/`Order`/`ContactMessage`; `Product` → `Category`, `ProductImage`, `OrderItem`; `Order` → `OrderItem`, `OrderAddress` (1:1), `OrderTracking` (1:1). Soft deletes via `isProductDeleted`/`isUserDeleted` booleans rather than row deletion. `Location` holds department/city data for Colombian shipping addresses. `OrderStatus` enum: `pending → processing → approved → shipped → delivered` (or `cancelled`).

**Import discipline**: components must import UI primitives from `@ui/<component>` (or `@/components/ui/<component>`) rather than the `@/components` barrel, to avoid circular deps. `scripts/fix-circular-imports.mjs` mechanically rewrites barrel imports of known shadcn component names into direct `@/components/ui/*` imports — rerun it (`node scripts/fix-circular-imports.mjs`) if you reintroduce barrel imports for UI components. Import order and Tailwind class sorting are enforced by Prettier plugins (`@trivago/prettier-plugin-sort-imports`, `prettier-plugin-tailwindcss`) — run `pnpm prettier` rather than hand-ordering imports.

## Formatting

No semicolons, double quotes, no trailing commas, 80-col width — see `.prettierrc`. Always run `pnpm prettier` (not manual formatting) since import order and Tailwind class order are plugin-driven and hard to replicate by hand.
