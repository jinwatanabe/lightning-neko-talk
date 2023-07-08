import {
  Group,
  GroupDate,
  GroupDescription,
  GroupId,
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

  async update(id: number, name: string, description: string, date: Date) {
    const group = new Group(
      new GroupId(id),
      new GroupName(name),
      new GroupDescription(description),
      new GroupDate(date)
    );
    const errorResponse = await this.inputPort.update(group);

    if (errorResponse) {
      this.outputPort.displayError(errorResponse);
    }
  }

  async delete(id: number) {
    const groupId = new GroupId(id);
    const errorResponse = await this.inputPort.delete(groupId);

    if (errorResponse) {
      this.outputPort.displayError(errorResponse);
    }
  }
}
