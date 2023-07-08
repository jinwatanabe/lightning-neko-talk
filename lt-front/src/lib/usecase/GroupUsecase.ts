import { GroupInputPort } from "./port/GroupInputPort";
import { GroupOutputPort } from "./port/GroupOutputPort";

export class GroupUsecase {
  constructor(
    readonly inputPort: GroupInputPort,
    readonly outputPort: GroupOutputPort
  ) {}

  async getAll() {
    const groupsResponse = await this.inputPort.getAll();

    if (groupsResponse.error) {
      this.outputPort.displayError(groupsResponse.error);
    } else {
      this.outputPort.display(groupsResponse.data ?? []);
    }
  }
}
