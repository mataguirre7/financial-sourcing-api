import { Temporal } from "temporal-polyfill";

export function toInstant(date: Date) {
    return Temporal.Instant.fromEpochMilliseconds(date.getTime());
}

export function toEpochMs(value: Date | Temporal.Instant) {
    return value instanceof Date ? value.getTime() : value.epochMilliseconds;
}