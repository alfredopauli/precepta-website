import test from "node:test";
import assert from "node:assert/strict";
import {
  DAYS,
  timeRange,
  isAvailable,
  inquiryUrl,
  filterClasses,
  classPayload,
} from "../src/lib/domain.js";
test("existing availability semantics are exact", () => {
  assert.equal(isAvailable({ status: false }), true);
  for (const status of [true, null, undefined, 0, "false"])
    assert.equal(isAvailable({ status }), false);
});
test("all six weekdays and 50-minute ranges", () => {
  assert.equal(DAYS[0], "Segunda-feira");
  assert.equal(DAYS[5], "Sábado");
  assert.equal(DAYS.length, 6);
  assert.equal(timeRange(0), "00h00–00h50");
  assert.equal(timeRange(23), "23h00–23h50");
});
test("inquiry encodes full context without changing records", () => {
  const item = { hour: 14, weekday: 0, status: false };
  const url = new URL(inquiryUrl(item, { name: "João & Ana" }));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/5511991723096");
  const message = url.searchParams.get("text");
  for (const s of ["João & Ana", "Segunda-feira", "14h00–14h50"])
    assert.ok(message.includes(s));
  assert.equal(item.status, false);
});
test("combined filters preserve overlaps and reset", () => {
  const items = [
    { teacher_id: 1, weekday: 0, hour: 14 },
    { teacher_id: 1, weekday: 0, hour: 14 },
    { teacher_id: 2, weekday: 1, hour: 15 },
  ];
  assert.equal(
    filterClasses(items, { teacher_id: "1", weekday: "0", hour: "14" }).length,
    2,
  );
  assert.equal(
    filterClasses(items, { teacher_id: "", weekday: "", hour: "" }).length,
    3,
  );
  assert.equal(
    filterClasses(items, { teacher_id: "1", weekday: "1", hour: "" }).length,
    0,
  );
});
test("class validation and availability mapping", () => {
  const form = { teacher_id: "a", weekday: "5", hour: "23", status: "false" };
  assert.deepEqual(classPayload(form), {
    teacher_id: "a",
    weekday: 5,
    hour: 23,
    status: false,
  });
  assert.equal(classPayload({ ...form, status: "true" }).status, true);
  for (const hour of ["", -1, 24, 1.5])
    assert.throws(() => classPayload({ ...form, hour }));
  for (const weekday of ["", -1, 6, 1.5])
    assert.throws(() => classPayload({ ...form, weekday }));
});
