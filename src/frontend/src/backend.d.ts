import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    body: string;
    tags: Array<string>;
    datePublished: string;
    author: string;
    excerpt: string;
    category: string;
}
export interface backendInterface {
    createPost(title: string, body: string, excerpt: string, author: string, tags: Array<string>, category: string): Promise<BlogPost>;
    getAllPosts(): Promise<Array<BlogPost>>;
    getPost(id: bigint): Promise<BlogPost | null>;
    initSeedData(): Promise<void>;
}
