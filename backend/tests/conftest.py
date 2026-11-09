from collections.abc import Iterator

import pytest
from app.main import app
from app.services.transactions import TransactionStore, get_store
from fastapi.testclient import TestClient


@pytest.fixture
def store() -> TransactionStore:
    return TransactionStore()


@pytest.fixture
def client(store: TransactionStore) -> Iterator[TestClient]:
    app.dependency_overrides[get_store] = lambda: store
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
