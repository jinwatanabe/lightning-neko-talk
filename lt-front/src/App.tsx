import { useEffect, useState } from "react";
import { GroupUnit } from "./view/state/GroupState";
import { groupsState, usecase } from "./lib/container";
import { z } from "zod";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Text,
  Input,
  Textarea,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";

function App() {
  const [groups, setGroups] = useState<GroupUnit[]>([]);
  const [name, setName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);

  const nameSchema = z
    .string()
    .min(1, { message: "1文字以上で入力してください" });

  const descriptionSchema = z
    .string()
    .min(1, { message: "1文字以上で入力してください" })
    .max(100, { message: "100文字以下で入力してください" });

  useEffect(() => {
    (async () => {
      await usecase.getAll();
      setGroups(groupsState.groups);
    })();
  }, []);

  const changeName = (name: string, schema: z.Schema) => {
    setName(name);
    try {
      schema.parse(name);
      setNameError("");
    } catch (e) {
      if (e instanceof z.ZodError) {
        setNameError(e.issues[0].message);
      }
    }
  };
  const changeDescription = (description: string, schema: z.Schema) => {
    setDescription(description);
    try {
      schema.parse(description);
      setDescriptionError("");
    } catch (e) {
      if (e instanceof z.ZodError) {
        setDescriptionError(e.issues[0].message);
      }
    }
  };

  const closeModal = () => {
    setNameError("");
    setDescriptionError("");
    setName("");
    setDescription("");
    setIsEdit(false);
    onClose();
  };

  const createGroup = async () => {
    const date = new Date();
    await usecase.create(name, description, date);
    const group = new GroupUnit(groups.length + 1, name, description, date);
    if (groupsState.errorMessage === null) {
      closeModal();
      setGroups([...groups, group]);
    }
  };

  const updateGroup = async () => {
    const date = new Date();
    await usecase.update(id, name, description, date);
    const group = new GroupUnit(id, name, description, date);
    if (groupsState.errorMessage === null) {
      closeModal();
      setGroups(groups.map((g) => (g.id === id ? group : g)));
    }
  };

  const deleteGroup = async (id: number) => {
    await usecase.delete(id);
    if (groupsState.errorMessage === null) {
      setGroups(groups.filter((g) => g.id !== id));
    }
  };

  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="700px">
        <Box
          className="test"
          w="100%"
          margin="10px 0"
          display="flex"
          justifyContent="flex-end"
        >
          <Button onClick={onOpen}>作成</Button>
        </Box>
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
                    <Button
                      colorScheme="teal"
                      key={group.id}
                      onClick={() => {
                        setName(group.name);
                        setDescription(group.description);
                        setIsEdit(true);
                        setId(group.id);
                        onOpen();
                      }}
                    >
                      編集
                    </Button>
                  </Th>
                  <Th width="100px">
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        deleteGroup(group.id);
                      }}
                    >
                      削除
                    </Button>
                  </Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Text>名前</Text>
              <Input
                value={name}
                onChange={(e) => changeName(e.target.value, nameSchema)}
              />
              {nameError !== "" && <Text color="red">{nameError}</Text>}
              <Text>説明</Text>
              <Textarea
                value={description}
                onChange={(e) =>
                  changeDescription(e.target.value, descriptionSchema)
                }
              />
              {descriptionError !== "" && (
                <Text color="red">{descriptionError}</Text>
              )}
            </Stack>
          </ModalBody>

          <ModalFooter>
            {isEdit ? (
              <Button colorScheme="blue" mr={3} onClick={() => updateGroup()}>
                更新
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  createGroup();
                }}
              >
                保存
              </Button>
            )}
            <Button variant="ghost" onClick={() => closeModal()}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;
