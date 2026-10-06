export function getJson(resultResponse: any) {
  const raw: string = resultResponse.choices?.[0]?.message?.content ?? "";
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}
