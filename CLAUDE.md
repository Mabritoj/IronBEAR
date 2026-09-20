# Project: IronBEAR

React 19 + TypeScript 5.x single-page application (`website/`) backed by an AWS SAM Node.js/TypeScript Lambda backend (repo root). Two independent npm projects in one repo — no shared `package.json`, no npm workspaces.

**Repo status:** fresh repo. Nothing below is scaffolded yet — `website/`, `handlers/`, `layers/`, `infrastructure/`, `template.yaml`, and `samconfig.toml` are all *planned* layouts, not existing files. Check the tree before assuming something exists.

## Frontend (`website/`)

### Commands

Run from inside `website/` (`cd website` first). Backend commands are in the Backend section below.

- `npm run dev` — start dev server (port 3000)
- `npm run build` — production build
- `npm run test` — run all tests with Vitest
- `npm run test -- --run src/components/Button.test.tsx` — run a single test file
- `npm run lint` — ESLint + Prettier check
- `npm run lint:fix` — auto-fix lint issues
- `npm run typecheck` — tsc --noEmit

Always run `npm run typecheck && npm run lint` before committing.

### Architecture (planned layout)

- `website/src/components/` — reusable UI components (Button, Modal, Table, etc.)
- `website/src/features/` — feature modules, each with its own components, hooks, and API calls
- `website/src/hooks/` — shared custom hooks
- `website/src/api/` — API client (`apiFetch`) and TanStack Query hooks, one module per entity
- `website/src/api/types/` — API response/domain types, one module per domain, re-exported from `index.ts`
- `website/src/api/mock/` — test-only fixtures and MSW handlers; never imported by app code
- `website/src/types/` — shared TypeScript types and interfaces
- `website/src/utils/` — pure utility functions
- `website/src/stores/` — Zustand global state
- `website/src/test/helpers.ts` — shared test utilities

**Adding a readable entity:** add a fixture to `api/mock/<entity>.ts` (tests only), then a `use<Entity>()` / `use<Entity>(id)` hook in `api/<entity>.ts` that calls `apiFetch` and wraps it in `useQuery`. Hooks call the real HTTP client directly — no mock fetchers as `queryFn`.

### Component Conventions

- Functional components only — no class components
- Use named exports, not default exports
- Co-locate tests: `Button.tsx` → `Button.test.tsx` in the same directory
- Co-locate styles: `Button.tsx` → `Button.module.css` (CSS Modules)
- Props interface named `{Component}Props` — e.g., `ButtonProps`
- Destructure props in the function signature

```tsx
// Good
export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button className={styles[variant]} onClick={onClick}>{label}</button>;
}
```

### State Management

- Local state: useState/useReducer
- Server state: TanStack Query (React Query) — never store API data in local state
- Global app state: Zustand stores in `website/src/stores/`
- No Redux — do not introduce Redux or Redux Toolkit

### Testing

- Use Vitest + React Testing Library
- Test behavior, not implementation — query by role, text, or test ID
- Every component should have at least a smoke test (renders without crashing)
- Mock API calls with MSW (Mock Service Worker), not jest.mock
- Place test utilities in `website/src/test/helpers.ts`

### TypeScript

- Strict mode enabled — do not use `any` unless absolutely necessary with a comment explaining why
- Prefer `interface` over `type` for object shapes
- Use discriminated unions for state machines and complex state
- API response types live in `website/src/api/types/` (re-exported from `index.ts`)

### Responsive Design

- All UI must scale down to phone widths (~320px) and work on tablets, not just desktop.
- Choose the app's breakpoints when the first layout is built and record them here; reuse them everywhere rather than introducing per-component values.
- Any fixed-pixel-width media (SVGs, images) inside a CSS Grid or Flex item must use fluid sizing (`width: 100%; max-width: <intrinsic>px`), not a hard `width: 300px`. A grid/flex item with a fixed-size child won't shrink below that child's size by default, which silently forces horizontal page overflow on narrow viewports — add `min-width: 0` on grid/flex items as a defensive default when they may contain fixed-size or long unbreakable content.
- When verifying UI changes in a browser, check at minimum one phone width (~375px) and tablet portrait (768px) in addition to desktop.

### Deployment

`website/` is a static site deployed independently of the SAM stack — `aws s3 sync` to the site bucket, then a CloudFront invalidation, in one npm script (`deploy:website`). The bucket name and distribution ID are passed as env vars each deploy, not looked up dynamically:

```
WEBSITE_BUCKET_NAME=<bucket> CLOUDFRONT_DISTRIBUTION_ID=<id> npm run deploy:website
```

## Backend (AWS SAM)

Node.js/TypeScript Lambda backend at the repo root. Follow the `aws-sam` skill for scaffolding a project or new function, writing handlers, and reviewing `template.yaml` — its `references/` files are the source of truth for the conventions summarized here.

### Commands (run from repo root)

- `npm install` — install root devDependencies (shared across `handlers/`/`layers/common/` for typechecking and testing; each handler folder and `layers/common/` also get their own independent `npm install` for their own runtime/build deps)
- `npm run typecheck` — `tsc --noEmit` over `handlers/` and `layers/common/src/`
- `npm test` — Jest, over every `*.test.ts` under `handlers/` and `layers/common/`
- `sam build` — bundles every handler with esbuild and builds `layers/common/` via its `Makefile`
- `sam local invoke <FunctionLogicalId> -e handlers/<service>/<path>/<name>.event.json` — test a function locally against a sample event
- `sam deploy --config-env dev` / `sam deploy --config-env prd` — deploy; `samconfig.toml` is gitignored (holds real account ID/role ARN/domain/hosted-zone-ID) — copy it from `samconfig.toml.example` (once scaffolded) and fill in your own values first

**Windows/local-build notes:** `esbuild` must be installed globally (`npm install -g esbuild`) for `sam build` to succeed locally — SAM's esbuild builder only installs a function's production dependencies, never devDependencies, so `esbuild` in a handler's own `package.json` isn't enough. If the AWS SAM CLI isn't on `PATH`, invoke it by its full install path (e.g. `C:\Program Files\Amazon\AWSSAMCLI\bin\sam.cmd`). If `sam` commands fail with "AWS Region was not found," set `AWS_DEFAULT_REGION` (e.g. `AWS_DEFAULT_REGION=us-east-1`) or pass `--region` explicitly. `sam local invoke` requires Docker; without it, `sam build` still fully verifies the bundling pipeline.

### Architecture (planned layout)

- `handlers/<service-name>/` — one Lambda per service/use-case (not per action), folder in kebab-case; `index.ts` routes internally by path depth and HTTP method, and leaf files hold the logic. Each leaf has a co-located `<name>.test.ts` and `<name>.event.json`.
- `layers/common/src/logger/`, `layers/common/src/config/` — shared Lambda layer: correlation-ID JSON logger and the `requireEnv()`-backed typed config helper, imported by handlers as the `logger`/`env-config` packages. Layer packages must be listed under `Metadata.BuildProperties.External` on every function that imports them.
- `shared-types/` — types shared across handlers, imported with `import type` through the `@shared-types` tsconfig path alias (compile-time only; not part of the layer).
- `infrastructure/` — CloudFormation nested stacks for non-SAM-native resources (DynamoDB, Cognito, CloudFront, etc.), grouped by service (e.g. `cloudfront.yaml` holds the distribution, bucket, cert, and DNS record together), wired into `template.yaml`; created on demand.
- `template.yaml` — root stack: only `AWS::Serverless::*` resources and `AWS::CloudFormation::Stack` declarations.
- `tsconfig.json`'s `paths` and `jest.config.cjs`'s `moduleNameMapper` both independently list the layer package names (`logger`, `env-config`) and `@shared-types`, so both need updating together whenever a new shared module is added.

### Code conventions

- Runtime `nodejs24.x`, ESM everywhere: `"type": "module"` in every `package.json`, esbuild `Format: esm`, tsconfig `NodeNext`. Handlers are `async (event) => {}` only — callback-style handlers fail on Node 24.
- Typing: `strict: true`; use `@types/aws-lambda` types, never `any`, for handler signatures.
- The top-level `index.ts` creates the correlation ID (`crypto.randomUUID()`) and `Logger`, passes the logger down through every nested router and leaf, and returns it as an `X-Correlation-Id` response header.
- Every leaf wraps its logic in try/catch and returns errors as `{ "error": { "code": "NOT_FOUND", "message": "..." } }` with an uppercase-underscore `code`; log via `logger.error(...)` before returning.
- Read env vars through the `env-config` helper (validated at module load), never raw `process.env`. Names are `SCREAMING_SNAKE_CASE`.
- AWS SDK v3 with modular imports; instantiate clients at module scope, outside the handler.

### Template conventions

- Logical ID is PascalCase + resource type: `handlers/identity/` → `IdentityFunction`, `UsersTable`, `CloudFrontStack`.
- Set an explicit name (`TableName`, `BucketName`, `RoleName`, ...) on every resource — never rely on generated names.
- `Globals` sets shared settings (Runtime, MemorySize, Tracing) with `Timeout: 30`; a function needing something else sets it at the resource level with a reason.
- Least-privilege IAM via SAM policy templates (e.g. `DynamoDBCrudPolicy`) — these only work in the root `template.yaml`, so roles inside `infrastructure/*.yaml` need explicit `AWS::IAM::Role` policy documents. Confirm any `Action: "*"` or `Resource: "*"` is intentional.
- Put `DeletionPolicy`/`UpdateReplacePolicy` on stateful resources (DynamoDB tables, S3 buckets). Use pseudo-parameters / `Fn::Sub` instead of hardcoded ARNs, account IDs, or regions.
- Nested stacks don't inherit parent parameters or `!GetAtt` each other: values flow `samconfig.toml` → root `Parameters` → the stack resource's `Parameters:` → the nested template's own `Parameters`. Sibling-to-sibling values route through the root's `!GetAtt <Stack>.Outputs.<Name>`.
- Environments are `[dev]` and `[prd]` sections in `samconfig.toml` (not `[prod]`). The only tag is `BACKUP: <stack name>`, applied stack-wide via `samconfig.toml`.

### Testing

Jest (not Vitest — that's `website/`'s test runner). AWS SDK calls are mocked with `aws-sdk-client-mock`, never hit against real AWS resources in unit tests. Mocked tests don't prove IAM, table, or API Gateway wiring — use `sam local invoke` or a deployed dev stack for that.

## Workflow

- Always create a todo list for any non-trivial task (multi-step work, a page build, a bug fix touching several files) and keep it updated as you go — mark items complete as soon as they're done, not batched at the end.

## Git

- Conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`
- Branch naming: `feature/`, `bug/`
- Feature branches merge locally into `dev` (an integration branch, created after the first commit) as each feature is completed; `dev` is what eventually goes to `main` via PR
- Always create a PR — never push directly to main

## Do NOT

- Do not use `any` without a justifying comment
- Do not add new dependencies without discussing first
- Do not use inline styles — use CSS Modules
- Do not use default exports
- Do not hardcode ARNs, account IDs, or region strings in templates
- Do not commit `samconfig.toml`
