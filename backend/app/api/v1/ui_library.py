from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated

from app.api.deps import get_db, get_current_user
from app.models.ui_library import UiLibrary
from app.models.user import User
from app.schemas.ui_library import UiLibraryRead, UiLibraryUpdate

router = APIRouter()
DBSession = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]


@router.get("/ui/library", response_model=UiLibraryRead, tags=["ui"])
def read_ui_library(db: DBSession, user: CurrentUser):
    library = db.query(UiLibrary).filter(UiLibrary.user_id == user.id).first()
    if not library:
        library = UiLibrary(user_id=user.id, component_keys=[])
        db.add(library)
        db.commit()
        db.refresh(library)
    return library


@router.put("/ui/library", response_model=UiLibraryRead, tags=["ui"])
def upsert_ui_library(payload: UiLibraryUpdate, db: DBSession, user: CurrentUser):
    library = db.query(UiLibrary).filter(UiLibrary.user_id == user.id).first()
    if not library:
        library = UiLibrary(user_id=user.id, component_keys=payload.component_keys)
        db.add(library)
    else:
        library.component_keys = payload.component_keys

    db.commit()
    db.refresh(library)
    return library

