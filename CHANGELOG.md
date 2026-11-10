# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y las versiones siguen [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

## [2.1.0] — 2026-11-09

Actualización a Node.js 26 (LTS), dependencias exactas y tooling de calidad. La tienda no cambia de comportamiento.

### Changed

- **Node.js 26.13.0** (LTS) en `.nvmrc` y CI; **pnpm 12.18.0** como `packageManager`.
- **Dependencias** fijadas a su versión exacta más reciente: Next.js 16.4.5, Prisma 7.10.1, TypeScript 6.0.3, dotenv 18.0.10 y demás.
- **Calidad**: se añade ESLint 10.14.0 con `eslint-config-next` 16.4.6 y `eslint-config-prettier`. Scripts `check`, `lint`, `eslint` y `eslint:fix`.
- **CI**: workflow de GitHub Actions con `check`, `eslint`, `prettier:check` y `build`.
- Las reglas `react-hooks/set-state-in-effect` e `incompatible-library` quedan en aviso: detectan patrones de hidratación existentes.

### Fixed

- `@emnapi/core` y `@emnapi/runtime` fijados a `1.11.3` mediante `overrides` en `pnpm-workspace.yaml`.
- Tipos vacíos en `input` y `textarea` de shadcn/ui reemplazados por alias de tipo.
