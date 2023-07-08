import { when } from "jest-when";
import { GroupUsecase } from "../GroupUsecase";
import { GroupInputPort } from "../port/GroupInputPort";
import { GroupOutputPort } from "../port/GroupOutputPort";

describe("GroupUsecase", () => {
  test("LTを表示する", async () => {
    const inputPort = {} as GroupInputPort;
    const getAllMock = jest.fn();
    inputPort.getAll = getAllMock;
    when(getAllMock).calledWith().mockResolvedValueOnce([]);

    const outputPort = {} as GroupOutputPort;
    const displayMock = jest.fn();
    outputPort.display = displayMock;

    const target = new GroupUsecase(inputPort, outputPort);

    await target.getAll();

    expect(getAllMock).toBeCalledTimes(1);
    expect(displayMock).toBeCalledTimes(1);
  });

  test("LT作成する", async () => {
    const inputPort = {} as GroupInputPort;
    const createMock = jest.fn();
    inputPort.create = createMock;
    when(createMock).calledWith().mockResolvedValueOnce(null);
    const outputPort = {} as GroupOutputPort;
    const target = new GroupUsecase(inputPort, outputPort);

    await target.create(
      "LT",
      "ライトニングトーク",
      new Date("2006-01-02 15:04:05")
    );
    expect(createMock).toBeCalledTimes(1);
  });

  test("LTを更新する", async () => {
    const inputPort = {} as GroupInputPort;
    const updateMock = jest.fn();
    inputPort.update = updateMock;
    when(updateMock).calledWith().mockResolvedValueOnce(null);
    const outputPort = {} as GroupOutputPort;
    const target = new GroupUsecase(inputPort, outputPort);

    await target.update(
      1,
      "LT",
      "ライトニングトーク",
      new Date("2006-01-02 15:04:05")
    );
    expect(updateMock).toBeCalledTimes(1);
  });

  test("LTを削除する", async () => {
    const inputPort = {} as GroupInputPort;
    const deleteMock = jest.fn();
    inputPort.delete = deleteMock;
    when(deleteMock).calledWith().mockResolvedValueOnce(null);
    const outputPort = {} as GroupOutputPort;
    const target = new GroupUsecase(inputPort, outputPort);

    await target.delete(1);
    expect(deleteMock).toBeCalledTimes(1);
  });
});
