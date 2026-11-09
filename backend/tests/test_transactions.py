from fastapi.testclient import TestClient


def test_list_transactions_is_empty(client: TestClient) -> None:
    response = client.get("/api/v1/transactions")

    assert response.status_code == 200
    assert response.json() == []


def test_create_transaction(client: TestClient) -> None:
    payload = {
        "description": "Coffee",
        "amount": "4.50",
        "category": "food",
        "occurred_on": "2026-11-03",
    }

    created = client.post("/api/v1/transactions", json=payload)

    assert created.status_code == 201
    body = created.json()
    assert body["id"] == 1
    assert body["description"] == "Coffee"
    assert body["amount"] == "4.50"

    listed = client.get("/api/v1/transactions")
    assert listed.status_code == 200
    assert listed.json() == [body]


def test_create_transaction_rejects_non_positive_amount(client: TestClient) -> None:
    response = client.post(
        "/api/v1/transactions",
        json={
            "description": "Refund",
            "amount": "0",
            "occurred_on": "2026-11-03",
        },
    )

    assert response.status_code == 422
