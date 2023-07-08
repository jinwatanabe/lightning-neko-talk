import { Group } from "./Group";

export class GroupResponse {
  constructor(
    readonly data: Group[] | null,
    readonly error: ErrorResponse | null
  ) {}
}

export class ErrorResponse {
  constructor(readonly message: string) {}
}
