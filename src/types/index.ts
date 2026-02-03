export interface Dataset {
  id: string
  name: string
  description?: string
  itemCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Cluster {
  id: string
  name: string
  datasets: Dataset[]
}
