import { Group, GroupId, GroupParams } from "../../domain/Group";
import { ErrorResponse, GroupResponse } from "../../domain/Response";

export interface GroupInputPort {
  getAll(): Promise<GroupResponse>;
  create(groupParams: GroupParams): Promise<ErrorResponse | null>;
  update(group: Group): Promise<ErrorResponse | null>;
  delete(id: GroupId): Promise<ErrorResponse | null>;
}
