import { Models, Query } from "appwrite";
import { extraQueryParams } from "./globalTypes";

export function getIdsFromDocument(cardTypes: Models.Document[]): string[] {
  const ids: string[] = [];
  for (const cardType of cardTypes) {
    ids.push(cardType.$id);
  }
  return ids;
}

export const convertDateToReadableString = (dbDate: Date| null): string => {
  if(!dbDate) return "Forever :)"
  const date = new Date(dbDate);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export const getQueriesFromParams = (params: extraQueryParams): string[]=> {
  const queries:string[] = [];
  for(const key in params){
    queries.push(Query.equal(key, params[key]))
  }
  return queries;
}
// export  {getIdsFromDocument}