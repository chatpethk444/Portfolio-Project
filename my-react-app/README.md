# Portfolio Frontend

## Environment

Create a `.env` file from `.env.example`:

- `VITE_API_BASE_URL` - FastAPI base URL
- `VITE_WEB3FORMS_ACCESS_KEY` - Web3Forms access key

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

The frontend uses a layered structure:

- `api/` - HTTP client and API functions
- `hooks/` - reusable state/data hooks
- `components/` - presentational UI
- `constants/` - static data
- `utils/` - shared helpers
