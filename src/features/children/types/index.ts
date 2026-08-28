export interface ClassroomDto {
  id: number;
  name: string;
}

export interface ClassDto {
  id: number;
  name?: string;
  year?: number;
}

export interface ChildDto {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  alias?: string;
  firstClassDate?: Date;
  address?: string;
  identityCardNumber?: string;
  age?: number;
  birthDate?: Date;
}

export interface ContactDto {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  identityCardNumber?: string;
  relationShipId: number;
  relationShip: string;
  phones: {
    id: number;
    number: string;
  }[];
}

export interface PinDto {
  id: number;
  name: string;
  grantedAt?: Date;
}

export interface ChildPermissionDto {
  id: number;
  name: string;
  shortName: string;
  hasIt: boolean;
}

export interface ChildDiseaseDto {
  id: number;
  name: string;
  description?: string;
  notes?: string;
}

export interface RelationshipTypeDto {
  id: number;
  name: string;
}

export interface CreateChildDto {
  firstName: string;
  lastName: string;
  alias?: string;
  address?: string;
  identityCardNumber?: string;
  birthDate?: Date;
}

export interface EditChildDto extends CreateChildDto {
  id: number;
}

export interface CreateContactDto {
  firstName: string;
  lastName: string;
  identityCardNumber?: string;
}

export interface UpsertContactDto extends CreateContactDto {
  id?: number;
}
