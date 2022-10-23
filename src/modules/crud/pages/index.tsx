import {
  Center,
  Table,
  TableCaption,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
  Input,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import {
  EditIcon, DeleteIcon, AddIcon, CheckIcon,
} from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { Fragment } from "react";
import useItem, { FormCreateValues, FormEditValues } from "../hooks/useItem";

interface Item {
  id: string;
  name: string;
  age: number;
}

interface TableItemProps extends Item {
  onRequestOpenModalEdit: (item: Item) => void;
  onRequestDelete: (id: string) => void;
}

function TableItem({
  id, name, age, onRequestOpenModalEdit, onRequestDelete,
}: TableItemProps) {
  return (
    <Tr>
      <Td>{id}</Td>
      <Td>{name}</Td>
      <Td isNumeric>{age}</Td>
      <Td>
        <Stack spacing={2} direction="row">
          <IconButton
            icon={<EditIcon />}
            aria-label="edit item"
            colorScheme="yellow"
            onClick={() => onRequestOpenModalEdit({ id, name, age })}
          />
          <IconButton
            icon={<DeleteIcon />}
            aria-label="edit item"
            colorScheme="red"
            onClick={() => onRequestDelete(id)}
          />
        </Stack>
      </Td>
    </Tr>
  );
}

interface CreateItemProps {
  handleCreateItem: (values: FormCreateValues) => void;
}

function CreateItem({ handleCreateItem }: CreateItemProps) {
  const { register, handleSubmit } = useForm<FormCreateValues>({
    mode: "onChange",
  });

  return (
    <Stack as="form" direction="row" onSubmit={handleSubmit(handleCreateItem)} width={400}>
      <Input placeholder="Name" {...register("name")} autoComplete="off" />
      <Input placeholder="Age" type="number" {...register("age")} autoComplete="off" />
      <IconButton icon={<AddIcon />} aria-label="add item" colorScheme="purple" type="submit" />
    </Stack>
  );
}

function Crud() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, reset } = useForm<FormEditValues>({
    mode: "onChange",
  });

  const onRequestOpenModalEdit = (values: FormEditValues) => {
    reset(values);
    onOpen();
  };

  const {
    items, handleCreateItem, handleEditItem, handleDelItem,
  } = useItem();

  const onSubmitEditForm = (values: FormEditValues) => {
    handleEditItem(values);
    onClose();
  };

  return (
    <Fragment>
      <Center height="100vh" background="gray.100">
        <Stack spacing={8} shadow="lg" padding={12} background="white" rounded="lg">
          <CreateItem handleCreateItem={handleCreateItem} />

          <TableContainer>
            <Table>
              <TableCaption>List of items</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th isNumeric>Age</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {items.map((item) => (
                  <TableItem
                    key={item.id}
                    {...item}
                    onRequestOpenModalEdit={onRequestOpenModalEdit}
                    onRequestDelete={handleDelItem}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmitEditForm)} id="editForm">
              <Stack>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input {...register("name")} autoComplete="off" />
                </FormControl>
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <Input type="number" {...register("age")} autoComplete="off" />
                </FormControl>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="purple" rightIcon={<CheckIcon />} form="editForm" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

export default Crud;
