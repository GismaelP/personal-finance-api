from fastapi import APIRouter

from app.api.routes import health, transactions

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(transactions.router, prefix="/transactions", tags=["transactions"])
