import {
  SimpleGrid,
  Container,
  Flex,
  Button,
  HStack,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorIndicator from "../components/ErrorIndicator";
import TicketCard from "../components/TicketCard";
import axios from "axios";

export default function Tickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sortOrderValue, setSortOrderValue] = useState("");
  const [filterValue, setFillterValue] = useState("");
  async function fetchAndUpdateData(sortOrderValue, filterValue) {
    setLoading(true);
    try {
      let queryParams = {};
      if (filterValue) {
        queryParams.status = filterValue;
      }
      if (sortOrderValue) {
        queryParams._sort = "priority";
        queryParams._order = sortOrderValue;
      }
      let res = await axios({
        method: "get",
        url: "http://localhost:3000/tickets",
        params: queryParams,
      });
      let data = res.data;
      //console.log(data);
      setLoading(false);
      setTickets(data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  useEffect(() => {
    fetchAndUpdateData(sortOrderValue, filterValue);
  }, [sortOrderValue, filterValue]);
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorIndicator />;
  }
  return (
    <Container maxW="cotainer.xl">
      <Flex>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={() => navigate("/ticket/create")}
          marginY={8}
        >
          Create Ticket
        </Button>
      </Flex>
      <HStack spacing={4} my={4}>
        <Select
          placeholder="Sort by Priority"
          onChange={(e) => setSortOrderValue(e.target.value)}
          value={sortOrderValue}
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>
        <Select
          placeholder="Filter by Status"
          onChange={(e) => setFillterValue(e.target.value)}
          value={filterValue}
        >
          <option value="progress">Progress</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </Select>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {tickets?.map((ticket) => (
          <TicketCard {...ticket} key={ticket.id} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
