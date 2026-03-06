from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1 import router as api_v1_router


app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
)

# CORS – à restreindre en prod
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    api_v1_router,
    prefix=settings.api_v1_prefix,
)


@app.get("/")
def read_root():
    return {"message": "AuroraStack SaaS backend ready"}
