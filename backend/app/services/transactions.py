from app.schemas.transaction import Transaction, TransactionCreate


class TransactionStore:
    """In-memory example store. Swap for a database-backed repository later."""

    def __init__(self) -> None:
        self._transactions: dict[int, Transaction] = {}
        self._next_id = 1

    def list(self) -> list[Transaction]:
        return list(self._transactions.values())

    def create(self, payload: TransactionCreate) -> Transaction:
        transaction = Transaction(id=self._next_id, **payload.model_dump())
        self._transactions[transaction.id] = transaction
        self._next_id += 1
        return transaction


_store = TransactionStore()


def get_store() -> TransactionStore:
    """FastAPI dependency so tests can swap in an isolated store."""
    return _store
