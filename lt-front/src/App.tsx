import { useEffect, useState } from "react";
import { GroupUnit, GroupUnitParams } from "./view/state/GroupState";
import { groupsState, usecase } from "./lib/container";
import { GroupTable } from "./component/GroupTable";
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
} from "@chakra-ui/react";
import { GroupDate, GroupDescription, GroupName } from "./lib/domain/Group";

function App() {
  const [groups, setGroups] = useState<GroupUnit[]>([]);
  const [name, setName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

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
        <GroupTable groups={groups} />
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
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                createGroup();
              }}
            >
              保存
            </Button>
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
