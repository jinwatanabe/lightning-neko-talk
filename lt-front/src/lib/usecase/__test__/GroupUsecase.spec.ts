import { GroupUsecase } from "../GroupUsecase"

describe("GroupUsecase", () => {
	test("LTを表示する", async () => {
		const target = new GroupUsecase()
		const actual = await target.getAll()
		const expected = [] as Groups
		expect(actual).toEqual(expected)
	}
})