import {
  Center, Heading, List, ListItem, Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <Center height="100vh">
      <Stack spacing={6} maxWidth={300}>
        <Heading>
          Boas Vindas ao React Labs
        </Heading>

        <List>
          <ListItem>
            <Link to="/miragejs">Miragejs</Link>
          </ListItem>
        </List>
      </Stack>
    </Center>
  );
}

export default Welcome;
