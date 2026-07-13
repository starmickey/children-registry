import { parseChildResumeDTO } from "@/features/children/dto/parser/childResume";
import { getChildResume } from "@/features/children/repository/childrenRepository";

export async function getChildResumeService(id: number) {
  const childResume = await getChildResume(id);

  if (!childResume) {
    return null;
  }

  return parseChildResumeDTO(childResume);
}
