import { GroupParams } from "../../domain/Group";
import { ErrorResponse, GroupResponse } from "../../domain/Response";

export interface GroupInputPort {
  getAll(): Promise<GroupResponse>;
  create(groupParams: GroupParams): Promise<ErrorResponse | null>;
}
