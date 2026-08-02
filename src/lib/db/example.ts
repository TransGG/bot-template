import { getMongoCollection } from "./driver.ts";

const collection = getMongoCollection<{ id: string; score: number }>("scores");
await collection.createIndex({ id: 1 });

export async function getScore(id: string) {
    const doc = await collection.findOne({ id });
    return doc?.score ?? null;
}

export async function incrementScore(id: string) {
    const doc = await collection.findOneAndUpdate({ id }, { $inc: { score: 1 } }, { upsert: true });
    return (doc?.score ?? 0) + 1;
}
