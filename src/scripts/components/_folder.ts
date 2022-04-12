import {readFile, writeFile} from 'fs/promises';

export interface Folders {
  id: string;
  name: string;
  files: string;
  subfolders: string;
  created_at: string;
  created_by: string;
  modified_at: string;
  modified_by: string;
}

export const getAll = async (): Promise<Folders[]> => {
  const buffer = await readFile('./_listsFileDetail.json', {
      encoding: 'utf-8'
  })

  return JSON.parse(buffer)
}

export const getById = async (id: string): Promise<Folders> => {
  const ListFolders = await getAll();
  const folder = ListFolders.find(folder => folder.id === id);
  if (folder) {
      return folder
  } else {
      throw new Error (`There's no folder with id: ${id}`)
  }

}

export const add = async (folder: Folders) => {
  const ListFolders = await getAll();

  await writeFile('./_listsFileDetail.json', JSON.stringify([...ListFolders, folder]))
}

export const removeById = async (id: string) => {
  const ListFolders = await getAll();
  const folder = ListFolders.filter(folder => folder.id !== id);
  await writeFile('./_listsFileDetail.json', JSON.stringify(folder))
}

export const update = async (folder: Partial<Folders>) => {
  if (!folder.id) {
      throw new Error(`You need to pass an id!`)
  }
  const folderToUpdate = await getById(folder.id);
  const updatedFolder = {...folderToUpdate, ...folder }

  await removeById(folder.id);
  await add(updatedFolder);
}
