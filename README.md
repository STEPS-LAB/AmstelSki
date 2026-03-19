# AmstelSki

UA:
Преміальний mobile-first сайт для boutique готелю в Буковелі, реалізований на `Next.js 16`, `TypeScript`, `Tailwind CSS`, `Framer Motion` та `next-intl`.

EN:
Premium mobile-first boutique hotel website for Bukovel, built with `Next.js 16`, `TypeScript`, `Tailwind CSS`, `Framer Motion`, and `next-intl`.

## Stack
- `Next.js` App Router
- `TypeScript` strict mode
- `Tailwind CSS` with custom dark luxury tokens
- `Framer Motion`
- `next-intl` with `ua` and `en`
- `Vitest`
- `Playwright`
- `Lighthouse CI`
- `Vercel`

## Scripts
- `npm run dev` - start local development
- `npm run build` - production build
- `npm run start` - serve production build
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript check
- `npm run test` - Vitest unit tests
- `npm run test:e2e` - Playwright smoke tests
- `npm run lhci` - Lighthouse CI

## Architecture
- `src/app/[locale]` - localized pages and route shell
- `src/components` - layout, UI primitives, room cards, home sections, SEO helpers
- `src/features/booking` - multi-step booking flow, drawer, sticky CTA, presets
- `src/features/concierge` - demo AI concierge
- `src/features/gallery` - asymmetrical gallery and lightbox
- `src/features/map` - dark themed location map
- `src/features/testimonials` - carousel
- `src/lib/content` - typed demo content for rooms, site structure, and journal
- `messages` - UA and EN copy dictionaries

## Content Strategy
UA:
Основна мова продукту - українська. Англійська версія підтримується через миттєве перемикання локалі. Контент організований так, щоб у майбутньому можна було замінити demo copy та stock imagery на реальні бренд-матеріали без переписування компонентів.

EN:
Ukrainian is the primary product language. English is supported through instant locale switching. Content is structured so demo copy and stock imagery can later be replaced with real brand assets without rewriting page composition.

## Booking
UA:
Бронювання побудоване як multi-step flow з preset сценаріями (`Tonight stay`, `Weekend stay`, `Business trip`), підбором категорій номерів та concierge-style confirmation.

EN:
Booking is implemented as a multi-step flow with preset scenarios, room matching, and concierge-style confirmation.

## Testing And CI
UA:
Репозиторій містить unit-тести для booking/i18n логіки, Playwright smoke coverage для головної та rooms сторінок, а також GitHub Actions pipeline для lint, typecheck, tests, build та Lighthouse CI.

EN:
The repository includes unit tests for booking and i18n logic, Playwright smoke coverage for the home and rooms pages, and a GitHub Actions pipeline for lint, typecheck, tests, build, and Lighthouse CI.

## Deployment
UA:
Проєкт підготовлений до деплою на Vercel. Базові security headers додані у `vercel.json`, а SEO endpoints доступні через `sitemap.xml` і `robots.txt`.

EN:
The project is ready for Vercel deployment. Basic security headers are configured in `vercel.json`, and SEO endpoints are exposed via `sitemap.xml` and `robots.txt`.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# AmstelSki
# AmstelSki
