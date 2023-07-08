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
});
