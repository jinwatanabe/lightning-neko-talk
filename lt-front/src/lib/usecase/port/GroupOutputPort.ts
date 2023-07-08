import { Group } from "../../domain/Group";
import { ErrorResponse } from "../../domain/Response";

export interface GroupOutputPort {
  display(groups: Group[]): void;
  displayError(message: ErrorResponse): void;
}
