import {
  Box, Button, Center, Flex, Input, List, ListItem, Stack,
} from "@chakra-ui/react";
import { Suspense, useState } from "react";
import useSWR from "swr";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import axios from "axios";

interface APIResponse {
  items: string[];
}

interface FormValues {
  name: string;
}

function ListItems() {
  const fetcher = (url: string) => axios.get<APIResponse>(url)
    .then((res) => res.data);

  const { data } = useSWR("/items", fetcher, { suspense: true });

  const [items, setItems] = useState<string[]>(data?.items as string[]);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const handleCreateItem = ({ name }: FormValues) => {
    axios.post("/item", { name }).then(() => {
      setItems((currItems) => [...currItems, name]);
      reset();
    });
  };

  return (
    <Stack spacing={8}>
      <Flex as="form" onSubmit={handleSubmit(handleCreateItem)}>
        <Input placeholder="Type item name" {...register("name")} />
        <Button type="submit">+</Button>
      </Flex>

      <List>
        {items.map((item) => (
          <ListItem key={item}>{item}</ListItem>
        ))}
      </List>
    </Stack>
  );
}

function Miragejs() {
  return (
    <Center height="100vh">
      <ErrorBoundary fallback={<Box>Error!</Box>}>
        <Suspense fallback={<Box>Loading</Box>}>
          <ListItems />
        </Suspense>
      </ErrorBoundary>
    </Center>
  );
}

export default Miragejs;
