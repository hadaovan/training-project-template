import {readFile, writeFile} from 'fs/promises';

export interface Files {
  id: string;
  name: string;
  type: string; 
  created_at: string;
  created_by: string;
  modified_at: string;
  modified_by: string;
}

export const getAll = async (): Promise<Files[]> => {
  const buffer = await readFile('./_listsFileDetail.json', {
      encoding: 'utf-8'
  })

  return JSON.parse(buffer)
}

export const getById = async (id: string): Promise<Files> => {
  const ListFiles = await getAll();
  const file = ListFiles.find(file => file.id === id);
  if (file) {
      return file
  } else {
      throw new Error (`There's no file with id: ${id}`)
  }

}

export const add = async (file: Files) => {
  const ListFiles = await getAll();

  await writeFile('./_listsFileDetail.json', JSON.stringify([...ListFiles, file]))
}

export const removeById = async (id: string) => {
  const ListFiles = await getAll();
  const file = ListFiles.filter(file => file.id !== id);
  await writeFile('./_listsFileDetail.json', JSON.stringify(file))
}

export const update = async (file: Partial<Files>) => {
  if (!file.id) {
      throw new Error(`You need to pass an id!`)
  }
  const fileToUpdate = await getById(file.id);
  const updatedFile = {...fileToUpdate, ...file }

  await removeById(file.id);
  await add(updatedFile);
}