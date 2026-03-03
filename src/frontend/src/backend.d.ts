import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ContactSubmission {
    id: bigint;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface TeamMember {
    id: bigint;
    bio: string;
    name: string;
    role: string;
    image: string;
}
export interface Service {
    id: bigint;
    title: string;
    features: Array<string>;
    description: string;
    priceRange?: string;
}
export interface Project {
    id: bigint;
    title: string;
    year: bigint;
    description: string;
    category: ProjectCategory;
    images: Array<string>;
}
export interface Product {
    id: bigint;
    title: string;
    description: string;
    category: ProductCategory;
    price: number;
}
export enum ProductCategory {
    textiles = "textiles",
    furniture = "furniture",
    lighting = "lighting",
    decor = "decor"
}
export enum ProjectCategory {
    commercial = "commercial",
    bedroom = "bedroom",
    bathroom = "bathroom",
    office = "office",
    kitchen = "kitchen",
    livingRoom = "livingRoom"
}
export interface backendInterface {
    addProduct(title: string, category: ProductCategory, description: string, price: number): Promise<bigint>;
    addProject(title: string, category: ProjectCategory, description: string, year: bigint, images: Array<string>): Promise<bigint>;
    addService(title: string, description: string, features: Array<string>, priceRange: string | null): Promise<bigint>;
    addTeamMember(name: string, role: string, bio: string, image: string): Promise<bigint>;
    deleteProduct(id: bigint): Promise<void>;
    deleteProject(id: bigint): Promise<void>;
    deleteService(id: bigint): Promise<void>;
    deleteTeamMember(id: bigint): Promise<void>;
    getAllContacts(): Promise<Array<ContactSubmission>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllProjects(): Promise<Array<Project>>;
    getAllServices(): Promise<Array<Service>>;
    getAllTeamMembers(): Promise<Array<TeamMember>>;
    initialize(): Promise<void>;
    submitContact(name: string, email: string, subject: string, message: string): Promise<bigint>;
    updateProduct(id: bigint, title: string, category: ProductCategory, description: string, price: number): Promise<void>;
    updateProject(id: bigint, title: string, category: ProjectCategory, description: string, year: bigint, images: Array<string>): Promise<void>;
    updateService(id: bigint, title: string, description: string, features: Array<string>, priceRange: string | null): Promise<void>;
    updateTeamMember(id: bigint, name: string, role: string, bio: string, image: string): Promise<void>;
}
