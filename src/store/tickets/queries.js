const ticketsQuery = `query {
  tickets {
    id
    title
    complaint
    status
    agent {
      id
      username
    }
    customer {
      id
      username  
    }
  }
}`;

const ticketQuery = `
  query GetTicket($id: ID!) {
    ticket(id: $id) {
      id
      title
      complaint
      status
      comments {
        id
        content
        user {
          id
          username
          email
          role
        }
      }
    }
  }
`;

const addTicketQuery = `
  mutation CreateTicket($input: CreateTicketInput!) {
  createTicket(input: $input) {
    id
    title
    complaint
    status
    agent {
      id
      username
    }
    customer {
      id
      username
    }
  }
}`

const commentMutation = `
  mutation AddComment($input: AddCommentInput!) {
  addComment(input: $input) {
    id
    content
    user {
      id
      username
      email
      role
    }
  }
}`

const updateTicketQuery = `
  mutation UpdateTicketStatus($input: UpdateTicketStatusInput!) {
    updateTicketStatus(input: $input) {
     id
      title
      complaint
      status
      comments {
        id
        content
        user {
          id
          username
          email
          role
        }
      }
    }
  }
`;

export { ticketsQuery, ticketQuery, commentMutation, addTicketQuery, updateTicketQuery}