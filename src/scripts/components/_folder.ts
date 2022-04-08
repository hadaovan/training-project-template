export interface ListFolders {
  name: string;
  files: string;
  subfolders: string;
  created_at: string;
  created_by: string;
  modified_at: string;
  modified_by: string;

}

export interface file extends ListFolders {
  id: number;
}