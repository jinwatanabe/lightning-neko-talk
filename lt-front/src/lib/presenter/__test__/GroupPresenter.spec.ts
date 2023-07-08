import { when } from "jest-when";
import { GroupState } from "../../../view/state/GroupState";
import { GroupPresenter } from "../GroupPresenter";
import {
  Group,
  GroupDate,
  GroupDescription,
  GroupId,
  GroupName,
} from "../../domain/Group";

describe("GroupPresenter", () => {
  test("LTを表示する", () => {
    const state = {} as GroupState;
    const setGroupMock = jest.fn();
    state.setGroups = setGroupMock;
    const groups = [
      new Group(
        new GroupId(1),
        new GroupName("LT"),
        new GroupDescription("ライトニングトーク"),
        new GroupDate(new Date("2006-01-02 15:04:05"))
      ),
    ];
    when(setGroupMock).calledWith(groups);

    const target = new GroupPresenter(state);
    target.display(groups);
    expect(setGroupMock).toBeCalledTimes(1);
    expect(setGroupMock).toBeCalledWith(groups);
  });
});
