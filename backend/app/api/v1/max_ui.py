from __future__ import annotations

from fastapi import APIRouter

from app.max_ui.catalog import list_product_types

router = APIRouter()


@router.get("/max-ui/product-types", tags=["max_ui"])
def get_max_ui_product_types():
    return {"productTypes": list_product_types()}

