interface Project {
  id: number;
  name: string;
  status: "active" | "inactive";
  tags: string[];
}

export type { Project };
