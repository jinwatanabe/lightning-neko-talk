import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { GroupUnit } from "../view/state/GroupState";

type Props = {
  groups: GroupUnit[];
};

export const GroupTable = (props: Props) => {
  const { groups } = props;

  return (
    <TableContainer border="1px" borderColor="blackAlpha.200" padding="5px">
      <Table>
        <Thead>
          <Tr>
            <Th>名前</Th>
            <Th>説明</Th>
            <Th>作成日</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {groups.map((group) => (
            <Tr key={group.id}>
              <Th>{group.name}</Th>
              <Th>{group.description}</Th>
              <Th>{group.date.toISOString()}</Th>
              <Th width="100px">
                <Button colorScheme="teal">編集</Button>
              </Th>
              <Th width="100px">
                <Button colorScheme="red">削除</Button>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
