import { EntryCollection } from "contentful";

export default interface PaginatedResults<T>
{
    totalResults: number,
    results: EntryCollection<T>
}