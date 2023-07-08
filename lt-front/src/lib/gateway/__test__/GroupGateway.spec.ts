import { when } from "jest-when";
import {
  Group,
  GroupDate,
  GroupDescription,
  GroupId,
  GroupName,
} from "../../domain/Group";
import {
  GroupApiResponse,
  GroupDriver,
  GroupJson,
} from "../../driver/GroupDriver";
import { GroupGateway } from "../GroupGateway";
import { GroupResponse } from "../../domain/Response";

describe("GroupGateway", () => {
  test("LTを表示する", async () => {
    const driver = {} as GroupDriver;
    const getAllMock = jest.fn();
    driver.getAll = getAllMock;
    when(getAllMock)
      .calledWith()
      .mockReturnValueOnce(
        new GroupApiResponse(
          [new GroupJson(1, "LT", "ライトニングトーク", "2006-01-02 15:04:05")],
          null
        )
      );
    const target = new GroupGateway(driver);
    const actual = await target.getAll();
    const expected = new GroupResponse(
      [
        new Group(
          new GroupId(1),
          new GroupName("LT"),
          new GroupDescription("ライトニングトーク"),
          new GroupDate(new Date("2006-01-02 15:04:05"))
        ),
      ],
      null
    );
    expect(actual).toEqual(expected);
  });
});
