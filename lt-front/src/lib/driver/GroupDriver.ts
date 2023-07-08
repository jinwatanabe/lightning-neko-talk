import axios, { AxiosResponse } from "axios";

export class GroupDriver {
  baseUrl =
    process.env.NODE_ENV === "prd"
      ? "https://api-image-kllnys4xfq-uc.a.run.app"
      : "http://localhost:3000";

  async getAll(): Promise<GroupApiResponse> {
    const result = axios
      .get(`${this.baseUrl}/v1/groups`)
      .then((response: AxiosResponse<GroupsJsonResponse>) => {
        const data = response.data;

        return new GroupApiResponse(data.groups, null);
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

  async create(groupParamsJson: GroupParamsJson): Promise<ApiError | null> {
    const params = new URLSearchParams();
    params.append("name", groupParamsJson.name);
    params.append("description", groupParamsJson.description);
    params.append("date", convertISOToCustomFormat(groupParamsJson.date));

    const result = axios
      .post(`${this.baseUrl}/v1/groups`, params)
      .then(() => {
        return null;
      })
      .catch((error) => {
        console.log(error);
        return new ApiError(error ? error : "データ作成に失敗しました");
      });

    return result;
  }

  async update(groupJson: GroupJson): Promise<ApiError | null> {
    const params = new URLSearchParams();
    params.append("name", groupJson.name);
    params.append("description", groupJson.description);
    params.append("date", convertISOToCustomFormat(groupJson.date));

    const result = axios
      .patch(`${this.baseUrl}/v1/groups/${groupJson.id}`, params)
      .then(() => {
        return null;
      })
      .catch((error) => {
        console.log(error);
        return new ApiError(error ? error : "データ更新に失敗しました");
      });

    return result;
  }

  async delete(id: number): Promise<ApiError | null> {
    const result = axios
      .delete(`${this.baseUrl}/v1/groups/${id}`)
      .then(() => {
        return null;
      })
      .catch((error) => {
        console.log(error);
        return new ApiError(error ? error : "データ削除に失敗しました");
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

export class GroupParamsJson {
  constructor(
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

class GroupsJsonResponse {
  constructor(readonly groups: GroupJson[]) {}
}

class ApiError {
  constructor(readonly message: string) {}
}

function convertISOToCustomFormat(isoDate: string): string {
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const customFormat = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return customFormat;
}
