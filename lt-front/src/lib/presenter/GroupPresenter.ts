import { GroupState } from "../../view/state/GroupState";
import { Group } from "../domain/Group";
import { ErrorResponse } from "../domain/Response";
import { GroupOutputPort } from "../usecase/port/GroupOutputPort";

export class GroupPresenter implements GroupOutputPort {
  constructor(readonly state: GroupState) {}
  display(groups: Group[]) : void {
    this.state.setGroups(groups);
  }

  displayError(message: ErrorResponse): void {
    throw new Error("Method not implemented.");
  }
}
