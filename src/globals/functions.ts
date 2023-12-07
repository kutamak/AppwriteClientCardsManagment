import { Models } from "appwrite";

function getIdsFromDocument(cardTypes: Models.Document[]): string[] {
  const ids: string[] = [];
  for (const cardType of cardTypes) {
    ids.push(cardType.$id);
  }
  return ids;
}


export  {getIdsFromDocument}