import { relationshipTypeRepository } from "../repositories/relationshiptype.repository";
import { RelationshipTypeDto } from "../types";

export async function getRelationshipTypes(): Promise<RelationshipTypeDto[]> {
  return relationshipTypeRepository.getRelationShipTypes();
}
