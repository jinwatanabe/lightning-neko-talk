import { GroupState } from "../view/state/GroupState";
import { GroupDriver } from "./driver/GroupDriver";
import { GroupGateway } from "./gateway/GroupGateway";
import { GroupPresenter } from "./presenter/GroupPresenter";
import { GroupUsecase } from "./usecase/GroupUsecase";

export const groupsState = new GroupState();
const driver = new GroupDriver();
const gateway = new GroupGateway(driver);
const presenter = new GroupPresenter(groupsState);
export const usecase = new GroupUsecase(gateway, presenter);
