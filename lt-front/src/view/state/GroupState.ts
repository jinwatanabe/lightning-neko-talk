import { Group } from "../../lib/domain/Group";

export class GroupState {
  groups: GroupUnit[] = [];
  errorMessage: string | null = null;

  setGroups(groups: Group[]) {
    this.groups = groups.map((g) => {
      return GroupUnitConvert(g);
    });
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}

export class GroupUnit {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly date: Date
  ) {}
}

export class GroupUnitParams {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly date: Date
  ) {}
}

function GroupUnitConvert(group: Group) {
  return new GroupUnit(
    group.id.value,
    group.name.value,
    group.description.value,
    group.date.value
  );
}
