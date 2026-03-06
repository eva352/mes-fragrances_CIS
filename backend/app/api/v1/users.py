from fastapi import APIRouter, Depends
from typing import Annotated

from app.api.deps import get_current_user
from app.schemas.user import UserRead
from app.models.user import User

router = APIRouter()

CurrentUser = Annotated[User, Depends(get_current_user)]


@router.get("/users/me", response_model=UserRead, tags=["users"])
def read_users_me(
    current_user: CurrentUser,
):
    """
    Récupère les informations de l'utilisateur actuellement authentifié.
    """
    return current_user