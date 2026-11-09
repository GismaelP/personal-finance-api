from datetime import date
from decimal import Decimal

from pydantic import BaseModel, Field


class TransactionCreate(BaseModel):
    description: str = Field(min_length=1, max_length=200)
    amount: Decimal = Field(gt=0, max_digits=12, decimal_places=2)
    category: str = Field(default="uncategorized", max_length=50)
    occurred_on: date


class Transaction(TransactionCreate):
    id: int
