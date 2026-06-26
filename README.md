
# Aditya Kardile — Portfolio (Full Project)

React + Tailwind CSS frontend, Spring Boot backend, SQLite (SQL) database.
Includes a private `/admin` page to add and delete projects from a webpage
— no code edits needed.

```
full-project/
├── backend/    Spring Boot REST API + SQLite database
└── frontend/   React + Tailwind CSS app
```

## 1. Run the backend

Requires Java 21+ and Maven, with normal internet access (Maven needs to
download Spring Boot's dependencies the first time).

```bash
cd backend
mvn spring-boot:run
```

Starts on **http://localhost:4000**. A `portfolio.db` file and an
`uploads/` folder are created automatically the first time you run it.

Quick check:
```bash
curl http://localhost:4000/api/projects
# -> []
```

## 2. Run the frontend

Requires Node.js (18+).

```bash
cd frontend
npm install
npm run dev
```

Starts on **http://localhost:5173**.

## 3. Add your projects

With both running, go to:

```
http://localhost:5173/admin
```

Fill in the form, click "Add Project." It appears instantly on the Home
page and gets its own details page at `/project/:id`.

---

## Project structure (component breakdown)

### Frontend (`frontend/src/`)

```
api.js                        — all calls to the backend (get/create/delete projects)
App.jsx                       — routes: / , /profile , /project/:id , /admin
main.jsx                      — React + Router entry point

components/
├── Navbar.jsx                — top nav (Home/Profile icons + Hire Me button)
├── Home.jsx                  — composes HeroCard + ProjectsSection
├── HeroCard.jsx               — the intro card (name, bio, Hire Me/Copy Email)
├── ProjectsSection.jsx        — projects list shown on Home (loading/error/empty states)
├── Profile.jsx                — composes EducationCard list + SkillsList
├── EducationCard.jsx          — one education entry (degree/institute/score)
├── SkillsList.jsx             — skill badge pills
├── ProjectDetails.jsx         — single project page, fetched by :id from the URL
└── admin/
    ├── Admin.jsx              — owns API calls + state, composes form + list
    ├── AdminLogin.jsx          — password gate shown before the admin panel
    ├── ProjectForm.jsx        — the "add project" form (name, role, year, image, etc.)
    ├── ProjectList.jsx        — existing-projects list with delete buttons
    └── ProjectCard.jsx        — single project row (shared by Home + Admin list)
```

### Backend (`backend/src/main/java/com/portfolio/backend/`)

```
PortfolioBackendApplication.java  — Spring Boot entry point
model/Project.java                — JPA entity (the "projects" SQL table)
repository/ProjectRepository.java — Spring Data JPA repository (auto CRUD)
controller/ProjectController.java — REST endpoints (GET/POST/DELETE)
controller/AdminController.java   — password verification endpoint for the login screen
config/CorsConfig.java            — allows your frontend's URL to call the API
config/StaticResourceConfig.java  — serves uploaded images at /uploads/**
config/AdminAuthFilter.java       — protects POST/DELETE with a password header
dto/ErrorResponse.java            — simple {error: "..."} JSON shape
resources/application.properties — port, database, file upload, password, CORS settings
```

### API endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/projects` | List all projects, newest first |
| GET | `/api/projects/{id}` | Get one project |
| POST | `/api/projects` | Create a project (multipart form: name, role, year, description, website, image) |
| DELETE | `/api/projects/{id}` | Delete a project (and its uploaded image file) |

---

## Important notes

- **`/admin` is now password-protected.** Set an `ADMIN_PASSWORD`
  environment variable before running the backend (defaults to
  `changeme123` for local dev only — change this before deploying).
  See `DEPLOYMENT.md` for the full walkthrough.
- **Want this visible to anyone on the internet, not just your laptop?**
  See `DEPLOYMENT.md` for free step-by-step hosting instructions
  (Render for the backend, Vercel for the frontend).
- Backend runs on port **4000**, frontend dev server on **5173**. If you
  change either, update `CorsConfig.java`/`application.properties`
  (backend) and `api.js` / `.env` (frontend) to match.
- Everything here was tested end-to-end (add a project through the real
  form → see it on Home → see it on its own details page → delete it
  through Admin) using a Node.js server sharing the exact same API
  contract as the Spring Boot backend, since my environment can't reach
  Maven Central to run Spring Boot directly. The Java code was reviewed
  carefully and follows standard Spring Boot conventions; if `mvn
  spring-boot:run` throws anything unexpected on your machine, send me
  the error and I'll fix it right away.

# Site link:-
https://portfolio-omega-two-526pzapozv.vercel.app/ 