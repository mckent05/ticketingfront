const ticketsQuery = `query {
  tickets {
    id
    title
    complaint
    status
    agent {
      id
      username
      email
    }
    customer {
      id
      username  
    }
    image
  }
}`;

const ticketQuery = `
  query GetTicket($id: ID!) {
    ticket(id: $id) {
      id
      title
      complaint
      status
      agent {
        id
        username
        email
      }
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
      image
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
      email
    }
    customer {
      id
      username
    }
    image
  }
}`;

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
}`;

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
      image
    }
  }
`;

const csvQuery = `
  query {
    csv
  }
`;

export {
  ticketsQuery,
  ticketQuery,
  commentMutation,
  addTicketQuery,
  updateTicketQuery,
  csvQuery,
};
