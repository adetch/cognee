import { Cluster, Dataset } from "@/types"

export const mockDatasets: Dataset[] = [
  {
    id: "ds-1",
    name: "quarterly-reports",
    description: "Q1-Q4 2024 financial reports",
    itemCount: 156,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "ds-2",
    name: "product-docs",
    description: "Product documentation and specs",
    itemCount: 89,
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-11-28"),
  },
  {
    id: "ds-3",
    name: "customer-feedback",
    description: "Customer surveys and feedback data",
    itemCount: 342,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-12-02"),
  },
  {
    id: "ds-4",
    name: "engineering-wiki",
    description: "Internal engineering documentation",
    itemCount: 67,
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-11-15"),
  },
  {
    id: "ds-5",
    name: "sales-materials",
    description: "Sales decks and case studies",
    itemCount: 45,
    createdAt: new Date("2024-05-12"),
    updatedAt: new Date("2024-10-20"),
  },
  {
    id: "ds-6",
    name: "hr-policies",
    description: "HR policies and employee handbook",
    itemCount: 23,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-09-15"),
  },
  {
    id: "ds-7",
    name: "research-papers",
    description: "Academic and research publications",
    itemCount: 178,
    createdAt: new Date("2024-07-20"),
    updatedAt: new Date("2024-12-01"),
  },
]

export const mockClusters: Cluster[] = [
  {
    id: "cluster-abc123",
    name: "cluster-abc123",
    datasets: mockDatasets,
  },
  {
    id: "cluster-prod-01",
    name: "cluster-prod-01",
    datasets: mockDatasets.slice(0, 3),
  },
  {
    id: "cluster-dev",
    name: "cluster-dev",
    datasets: mockDatasets.slice(0, 2),
  },
]
