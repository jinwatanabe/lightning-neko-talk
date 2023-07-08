import axios, { AxiosResponse } from "axios";

export class GroupDriver {
  async getAll(): Promise<GroupApiResponse> {
    const result = axios
      .get("http://localhost:8080/v1/groups")
      .then((response: AxiosResponse<GroupJson[]>) => {
        const data = response.data;
        return new GroupApiResponse(data, null);
      })
      .catch((error) => {
        console.log(error);
        return new GroupApiResponse(
          null,
          new ErrorResponse(error ? error : "データ取得に失敗しました")
        );
      });

    return result;
  }
}

export class GroupJson {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly date: string
  ) {}
}

export class GroupApiResponse {
  constructor(
    readonly data: GroupJson[] | null,
    readonly error: ErrorResponse | null
  ) {}
}

export class ErrorResponse {
  constructor(readonly message: string) {
    this.message = message;
  }
}
