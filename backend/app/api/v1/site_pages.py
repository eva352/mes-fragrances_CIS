from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Annotated
import uuid

from app.api.deps import get_db, get_current_user
from app.models.site_page import SitePage
from app.models.user import User
from app.schemas.site_page import (
    SitePageRead,
    SitePageUpsert,
    SitePageCreate,
    BlockInstance,
)

router = APIRouter()
DBSession = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]

def _next_nav_order(db: Session, parent_id: uuid.UUID | None) -> int:
    query = db.query(SitePage.nav_order).filter(SitePage.parent_id == parent_id)
    max_value = query.order_by(SitePage.nav_order.desc()).limit(1).scalar()
    return int(max_value or 0) + 1


def _set_home(db: Session, page: SitePage) -> None:
    db.query(SitePage).filter(SitePage.id != page.id).update({SitePage.is_home: False})
    page.is_home = True


@router.get("/site/pages", response_model=list[SitePageRead], tags=["site"])
def list_site_pages(db: DBSession):
    return (
        db.query(SitePage)
        .order_by(SitePage.parent_id.is_(None).desc(), SitePage.parent_id, SitePage.nav_order, SitePage.title)
        .all()
    )


@router.get("/site/pages/{slug}", response_model=SitePageRead, tags=["site"])
def read_site_page(slug: str, db: DBSession):
    page = db.query(SitePage).filter(SitePage.slug == slug).first()
    if not page:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Page not found")

    return page


@router.post("/site/pages", response_model=SitePageRead, tags=["site"])
def create_site_page(payload: SitePageCreate, db: DBSession, _: CurrentUser):
    existing = db.query(SitePage).filter(SitePage.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already exists")

    nav_order = payload.nav_order
    if nav_order is None:
        nav_order = _next_nav_order(db, payload.parent_id)

    page = SitePage(
        slug=payload.slug,
        title=payload.title,
        parent_id=payload.parent_id,
        status=payload.status,
        show_in_nav=payload.show_in_nav,
        nav_order=nav_order,
        is_home=payload.is_home,
        objective=payload.objective,
        expected_action=payload.expected_action,
        key_messages=payload.key_messages,
        facts=payload.facts,
        blocks=[],
    )
    db.add(page)
    if payload.is_home:
        _set_home(db, page)
    db.commit()
    db.refresh(page)
    return page


@router.put("/site/pages/{slug}", response_model=SitePageRead, tags=["site"])
def upsert_site_page(
    slug: str,
    payload: SitePageUpsert,
    db: DBSession,
    _: CurrentUser,
):
    page = db.query(SitePage).filter(SitePage.slug == slug).first()
    fields = payload.model_fields_set

    if not page:
        nav_order = payload.nav_order
        if nav_order is None:
            nav_order = _next_nav_order(db, payload.parent_id)
        page = SitePage(
            slug=slug,
            title=payload.title or slug,
            parent_id=payload.parent_id,
            status=payload.status or "published",
            show_in_nav=payload.show_in_nav if payload.show_in_nav is not None else True,
            nav_order=nav_order,
            is_home=payload.is_home or False,
            objective=payload.objective,
            expected_action=payload.expected_action,
            key_messages=payload.key_messages or [],
            facts=payload.facts,
            blocks=[b.model_dump() for b in (payload.blocks or [])],
        )
        db.add(page)
    else:
        if "title" in fields:
            page.title = payload.title
        if "blocks" in fields:
            page.blocks = [b.model_dump() for b in payload.blocks]
        if "parent_id" in fields:
            if payload.parent_id != page.parent_id:
                page.parent_id = payload.parent_id
                if payload.nav_order is None:
                    page.nav_order = _next_nav_order(db, payload.parent_id)
        if "status" in fields:
            page.status = payload.status
        if "show_in_nav" in fields:
            page.show_in_nav = payload.show_in_nav
        if "nav_order" in fields:
            page.nav_order = payload.nav_order
        if "is_home" in fields:
            page.is_home = payload.is_home
        if "objective" in fields:
            page.objective = payload.objective
        if "expected_action" in fields:
            page.expected_action = payload.expected_action
        if "key_messages" in fields:
            page.key_messages = payload.key_messages
        if "facts" in fields:
            page.facts = payload.facts

    if "is_home" in fields and payload.is_home:
        _set_home(db, page)

    db.commit()
    db.refresh(page)
    return page


@router.delete("/site/pages/{slug}", status_code=status.HTTP_204_NO_CONTENT, tags=["site"])
def delete_site_page(slug: str, db: DBSession, _: CurrentUser):
    total_pages = db.query(SitePage).count()
    if total_pages <= 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot delete last page")

    page = db.query(SitePage).filter(SitePage.slug == slug).first()
    if not page:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Page not found")

    was_home = page.is_home
    db.delete(page)
    db.commit()

    if was_home:
        next_page = (
            db.query(SitePage)
            .order_by(SitePage.parent_id.is_(None).desc(), SitePage.nav_order, SitePage.title)
            .first()
        )
        if next_page:
            _set_home(db, next_page)
            db.commit()

    return None


@router.post("/site/pages/{slug}/blocks", response_model=SitePageRead, tags=["site"])
def append_block_to_page(
    slug: str,
    block: BlockInstance,
    db: DBSession,
    _: CurrentUser,
):
    page = db.query(SitePage).filter(SitePage.slug == slug).first()
    if not page:
        page = SitePage(
            slug=slug,
            title=slug,
            blocks=[],
            status="published",
            show_in_nav=True,
            nav_order=_next_nav_order(db, None),
        )
        db.add(page)
        db.commit()
        db.refresh(page)

    blocks = list(page.blocks or [])
    payload = block.model_dump()
    if not payload.get("id"):
        payload["id"] = str(uuid.uuid4())
    blocks.append(payload)
    page.blocks = blocks
    db.commit()
    db.refresh(page)
    return page
