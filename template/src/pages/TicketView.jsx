import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Box,
  Stack,
  StackDivider,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorIndicator from "../components/ErrorIndicator";
export default function TicketView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [ticket, setTicket] = useState({});
  async function fetchAndUpdateData(id) {
    setLoading(true);
    try {
      let res = await axios({
        method: "get",
        url: `http://localhost:3000/tickets/${id}`,
      });

      let data = res.data;
      //console.log(data);
      setLoading(false);
      setTicket(data);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  useEffect(() => {
    fetchAndUpdateData(id);
  }, [id]);
  async function deleteTicket() {
    try {
      let response = await axios({
        method: "delete",
        url: `http://localhost:3000/tickets/${id}`,
      });
      if (response.status == 200) {
        navigate("/tickets");
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorIndicator />;
  }
  const { title, description, assignee, status, priority } = ticket;
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Status
            </Heading>
            <Text pt="2" fontSize="sm">
              {status}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Priority
            </Heading>
            <Text pt="2" fontSize="sm">
              {priority}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Description
            </Heading>
            <Text pt="2" fontSize="sm">
              {description}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Assignee
            </Heading>
            <Text pt="2" fontSize="sm">
              {assignee}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter>
        <HStack spacing={4}>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => navigate(`/ticket/edit/${id}`)}
          >
            Edit Ticket
          </Button>
          <Button colorScheme="red" variant="outline" onClick={deleteTicket}>
            Delete Ticket
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
}
