export async function evaluateLab(payload: {
  parameter: string;
  value: number;
  age: number;
  gender: string;
}) {
  const response = await fetch("http://127.0.0.1:8000/api/labs/evaluate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Lab evaluation failed");
  }

  return response.json();
}