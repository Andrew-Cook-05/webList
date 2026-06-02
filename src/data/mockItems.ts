import type { Item } from "../types/Item.ts";

export const items: Item[] = [
    {
        id: "1",
        name: "Finish Dataset",
        status: "Completed",
        category: "Work",
        createdDate: new Date("2026-06-02")
    },
    {
        id: "2",
        name: "Complete API",
        status: "Not Started",
        category: "Work",
        createdDate: new Date("2026-06-01")
    },
    {
        id: "3",
        name: "Finish List UI",
        status: "In Progress",
        category: "Work",
        createdDate: new Date("2026-06-02")
    },
    {
        id: "4",
        name: "Re-register KOTH",
        status: "In Progress",
        category: "School",
        createdDate: new Date("2026-04-29")
    },
    {
        id: "5",
        name: "Translate Pokemon Book",
        status: "Not Started",
        category: "Fun",
        createdDate: new Date("2026-06-01")
    },
    {
        id: "6",
        name: "Reach out to Shamisen Rakuya",
        status: "Completed",
        category: "School",
        createdDate: new Date("2026-05-28")
    },
    {
        id: "7",
        name: "Purchase Shamisen",
        status: "In Progress",
        category: "School",
        createdDate: new Date("2026-04-21")
    },
    {
        id: "8",
        name: "Go to Pokecenter Shibuya",
        status: "Completed",
        category: "Fun",
        createdDate: new Date("2026-06-01")
    }
]

export default items;