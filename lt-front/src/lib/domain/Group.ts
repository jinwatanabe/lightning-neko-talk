export class Group {
  constructor(
    readonly id: GroupId,
    readonly name: GroupName,
    readonly description: GroupDescription,
    readonly date: GroupDate
  ) {}
}

export class GroupId {
  constructor(readonly value: number) {}
}

export class GroupName {
  constructor(readonly value: string) {}
}

export class GroupDescription {
  constructor(readonly value: string) {}
}

export class GroupDate {
  constructor(readonly value: Date) {}
}
