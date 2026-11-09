from typing import Annotated

from fastapi import APIRouter, Depends, status

from app.schemas.transaction import Transaction, TransactionCreate
from app.services.transactions import TransactionStore, get_store

router = APIRouter()

Store = Annotated[TransactionStore, Depends(get_store)]


@router.get("", response_model=list[Transaction])
async def list_transactions(store: Store) -> list[Transaction]:
    """Example resource. Replace the in-memory store with a real repository."""
    return store.list()


@router.post("", response_model=Transaction, status_code=status.HTTP_201_CREATED)
async def create_transaction(payload: TransactionCreate, store: Store) -> Transaction:
    return store.create(payload)
