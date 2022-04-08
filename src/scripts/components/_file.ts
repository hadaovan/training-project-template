export interface ListFiles {
  name: string;
  type: string; 
  created_at: string;
  created_by: string;
  modified_at: string;
  modified_by: string;
}
export interface File extends ListFiles {
  id: number;
}

