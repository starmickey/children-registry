import { parseChildResumeDTO } from "@/features/children/dto/parser/childResume";
import { getChildren, getChildResume } from "@/features/children/repository/childrenRepository";
import { parseChildDTO } from "../dto/parser/child";

export async function fetchChildrenService() {
  const children = await getChildren();

  return children.map(parseChildDTO);
}

export async function getChildResumeService(id: number) {
  const childResume = await getChildResume(id);

  if (!childResume) {
    return null;
  }

  return parseChildResumeDTO(childResume);
}
