import { fetchWithResponse, fetchWithoutResponse, fetchIgnore404 } from "./fetcher";


export function getCart() {
  return fetchIgnore404("cart", {
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

export function deleteCart() {
  return fetchWithoutResponse("cart", {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
}
