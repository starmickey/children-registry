import { searchChildren } from "@/features/children/repository/childrenRepository";
import { parseChildDTO } from "../dto/parser/child";

export async function searchChildrenService(searchString?: string) {
  const children = await searchChildren(searchString);

  return children.map(parseChildDTO);
}
