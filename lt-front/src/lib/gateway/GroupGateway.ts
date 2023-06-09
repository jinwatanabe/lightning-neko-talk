import {
  Group,
  GroupDate,
  GroupDescription,
  GroupId,
  GroupName,
  GroupParams,
} from "../domain/Group";
import { ErrorResponse, GroupResponse } from "../domain/Response";
import { GroupDriver } from "../driver/GroupDriver";
import { GroupInputPort } from "../usecase/port/GroupInputPort";

export class GroupGateway implements GroupInputPort {
  constructor(readonly driver: GroupDriver) {}
  async getAll() {
    const groupsResponse = await this.driver.getAll();

    if (groupsResponse.data === null) {
      return new GroupResponse(
        null,
        new ErrorResponse(
          groupsResponse.error?.message ?? "データが取得できませんでした"
        )
      );
    }

    return new GroupResponse(
      groupsResponse.data.map((group) => {
        return new Group(
          new GroupId(group.id),
          new GroupName(group.name),
          new GroupDescription(group.description),
          new GroupDate(new Date(group.date))
        );
      }),
      null
    );
  }

  async create(group: GroupParams) {
    const groupParamsJson = {
      name: group.name.value,
      description: group.description.value,
      date: group.date.value.toISOString(),
    };
    const errorResponse = await this.driver.create(groupParamsJson);

    if (errorResponse) {
      return new ErrorResponse(errorResponse.message);
    }

    return null;
  }

  async update(group: Group) {
    const groupJson = {
      id: group.id.value,
      name: group.name.value,
      description: group.description.value,
      date: group.date.value.toISOString(),
    };
    const errorResponse = await this.driver.update(groupJson);

    if (errorResponse) {
      return new ErrorResponse(errorResponse.message);
    }

    return null;
  }

  async delete(id: GroupId) {
    const errorResponse = await this.driver.delete(id.value);

    if (errorResponse) {
      return new ErrorResponse(errorResponse.message);
    }

    return null;
  }
}
