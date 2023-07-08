import {
  GroupDate,
  GroupDescription,
  GroupName,
  GroupParams,
} from "../domain/Group";
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

  async create(name: string, description: string, date: Date) {
    const groupParams = new GroupParams(
      new GroupName(name),
      new GroupDescription(description),
      new GroupDate(date)
    );
    const errorResponse = await this.inputPort.create(groupParams);

    if (errorResponse) {
      this.outputPort.displayError(errorResponse);
    }
  }
}
