import { fetchWithResponse } from "./fetcher";

export function getCart() {
  return fetchWithResponse("cart", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function getOrders() {
  return fetchWithResponse("orders", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}

export function completeCurrentOrder(orderId, payment_type) {
  return fetchWithResponse(`orders/${orderId}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payment_type }),
  });
}
