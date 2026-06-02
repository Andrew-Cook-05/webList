export type Item = {
    id: string;
    name: string;
    status: "Not Started" | "In Progress" | "Completed";
    category: string;
    createdDate: Date;
}