import { when } from "jest-when";
import {
  Group,
  GroupDate,
  GroupDescription,
  GroupId,
  GroupName,
  GroupParams,
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

  test("LTを作成する", async () => {
    const driver = {} as GroupDriver;
    const createMock = jest.fn();
    driver.create = createMock;
    when(createMock).calledWith().mockReturnValueOnce(null);
    const target = new GroupGateway(driver);
    const group = new GroupParams(
      new GroupName("LT"),
      new GroupDescription("ライトニングトーク"),
      new GroupDate(new Date("2006-01-02 15:04:05"))
    );
    await target.create(group);
    expect(createMock).toBeCalledTimes(1);
  });

  test("LTを更新する", async () => {
    const driver = {} as GroupDriver;
    const updateMock = jest.fn();
    driver.update = updateMock;
    when(updateMock).calledWith().mockReturnValueOnce(null);
    const target = new GroupGateway(driver);
    const group = new Group(
      new GroupId(1),
      new GroupName("LT"),
      new GroupDescription("ライトニングトーク"),
      new GroupDate(new Date("2006-01-02 15:04:05"))
    );
    await target.update(group);
    expect(updateMock).toBeCalledTimes(1);
  });

  test("LTを削除する", async () => {
    const driver = {} as GroupDriver;
    const deleteMock = jest.fn();
    driver.delete = deleteMock;
    when(deleteMock).calledWith().mockReturnValueOnce(null);
    const target = new GroupGateway(driver);
    const id = new GroupId(1);
    await target.delete(id);
    expect(deleteMock).toBeCalledTimes(1);
  });
});
