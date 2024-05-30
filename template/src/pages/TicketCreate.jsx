import { Container, Input, VStack,Textarea,Select,Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function TicketCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState(""); 
  const [status, setStatus] = useState(""); 
  const [priority, setPriority] = useState(""); 
  const navigate = useNavigate();
  async function handleCreateTicket() {
    try {
      const newTicket = {
        title: title,
        description: description,
        assignee: assignee,
        status: status,
        priority: priority,
      };

      let res = await axios({
        method: "post",
        url: `http://localhost:3000/tickets`,
        data: newTicket,
      });

      if (res.status === 201) {
        navigate(`/tickets`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <VStack spacing={8} my={4}>
        <Input
          placeholder="Enter Title"
          size="lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          size="lg"
        />
        <Select
          placeholder="Assignee"
          size="lg"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
          <option value="manish">Manish</option>
          <option value="nitish">Nitish</option>
          <option value="sonu">Sonu</option>
          <option value="rahul">Rahul</option>
          <option value="pankaj">Pankaj</option>
        </Select>
        <Select
          placeholder="Status"
          size="lg"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="progress">Progress</option>
          <option value="completed">Completed</option>
        </Select>
        <Select
          placeholder="Priority"
          size="lg"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}> 4</option>
          <option value={5}> 5</option>
          <option value={6}> 6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </Select>
        <Button
          variant="outline"
          colorScheme="red"
          onClick={handleCreateTicket}
        >
          Create Ticket
        </Button>
      </VStack>
    </Container>
  );
}
