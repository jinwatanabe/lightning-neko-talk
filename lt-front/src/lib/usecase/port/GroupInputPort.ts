import { GroupResponse } from "../../domain/Response";

export interface GroupInputPort {
  getAll(): Promise<GroupResponse>;
}
