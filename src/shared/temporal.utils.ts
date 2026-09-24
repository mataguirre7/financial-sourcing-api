import { Temporal } from "temporal-polyfill";

export function toInstant(date: Date) {
    return Temporal.Instant.fromEpochMilliseconds(date.getTime());
}