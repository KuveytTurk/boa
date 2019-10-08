export default {
  activeItem: 'postman',
  content: [
    {
      id: 'introduction',
      level: 1,
      content: 'Introduction',
      children: [
        {
          id: 'postman',
          level: 2,
          content: 'Postman',
          children: [
            {
              id: 'installing-postman',
              level: 3,
              content: 'Installing Postman',
              children: [],
            },
            {
              id: 'importing-web-service-endpoints',
              level: 3,
              content: 'Importing Web Service Endpoints',
              children: [],
            },
            {
              id: 'sending-a-request',
              level: 3,
              content: 'Sending A Request',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 'authentication',
      level: 1,
      content: 'Authentication',
      children: [
        {
          id: 'generate-api-key',
          level: 2,
          content: 'Generate API Key',
          children: [
            {
              id: 'http-request',
              level: 3,
              content: 'HTTP Request',
              children: [],
            },
            {
              id: 'parameters',
              level: 3,
              content: 'Parameters',
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
