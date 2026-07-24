"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ClassroomDTO } from "@/features/classroom/classroom.dto";

type Props = {
  classrooms: ClassroomDTO[];
  activeId?: number;
};

export function ChildrenClassroomFiltersClient({ classrooms, activeId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilter = (classroomId?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (classroomId != null) {
      params.set("cr", classroomId.toString());
    } else {
      params.delete("cr");
    }

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(targetUrl);
  };

  return (
    <ButtonGroup className="flex w-full mb-4">
      <Button
        onClick={() => handleFilter()}
        variant={activeId == null ? "default" : "primary-outline"}
        className="flex-1 uppercase"
      >
        Todos
      </Button>

      {classrooms.map((classroom) => (
        <Button
          key={classroom.id}
          onClick={() => handleFilter(classroom.id)}
          variant={activeId === classroom.id ? "default" : "primary-outline"}
          className="flex-1 uppercase"
        >
          {classroom.name}
        </Button>
      ))}
    </ButtonGroup>
  );
}