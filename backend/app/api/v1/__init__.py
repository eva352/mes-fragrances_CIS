from fastapi import APIRouter

from . import health, auth, users, site_pages, ui_library, app_spec, project_brief, llm, structure, max_ui, perfumes

router = APIRouter()

router.include_router(health.router)
router.include_router(auth.router)
router.include_router(users.router)
router.include_router(site_pages.router)
router.include_router(ui_library.router)
router.include_router(app_spec.router)
router.include_router(project_brief.router)
router.include_router(llm.router)
router.include_router(structure.router)
router.include_router(max_ui.router)
router.include_router(perfumes.router)
