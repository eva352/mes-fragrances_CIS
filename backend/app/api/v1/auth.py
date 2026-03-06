from fastapi import APIRouter, Depends, HTTPException, status, Response, Header
from sqlalchemy.orm import Session
from typing import Annotated

from app.api.deps import get_db
from app.schemas.user import UserLogin
from app.models.user import User
from app.core.security import verify_password, create_access_token

router = APIRouter()
DBSession = Annotated[Session, Depends(get_db)]


@router.post("/auth/login", tags=["auth"])
def login_access_token(
    db: DBSession,
    form_data: UserLogin,
    response: Response,
):
    user = db.query(User).filter(User.email == form_data.email).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")

    token = create_access_token(str(user.id))

    # Retourner le token dans le corps de la réponse (comme spécifié dans la Tranche 3)
    return {"message": "authenticated", "token": token}


@router.post("/auth/logout", tags=["auth"])
def logout_access_token(
    authorization: Annotated[str | None, Header()] = None,
):
    # JWT stateless: on logout, the client forgets the token.
    return {"message": "logged_out"}
