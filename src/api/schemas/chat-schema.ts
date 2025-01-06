import { z } from "@hono/zod-openapi";

const ChatType = z.enum(["PRIVATE", "GROUP"]).openapi({
  description: "The type of chat: either PRIVATE or GROUP",
  example: "PRIVATE",
});

const ChatSchema = z
  .object({
    chat_id: z.number().int().openapi({
      description: "Unique identifier for the chat",
      example: 1,
    }),
    group_id: z.number().int().nullable().optional().openapi({
      description: "The ID of the associated group, if applicable",
      example: 42,
    }),
    sent_by: z.number().int().nullable().optional().openapi({
      description: "The user ID of the sender",
      example: 10,
    }),
    message: z.string().nullable().optional().openapi({
      description: "The content of the chat message",
      example: "Hello, how are you?",
    }),
    chat_type: ChatType,
    createdAt: z.string().datetime().openapi({
      description: "Timestamp when the chat was created",
      example: "2025-01-01T12:00:00.000Z",
    }),
    updatedAt: z.string().datetime().openapi({
      description: "Timestamp when the chat was last updated",
      example: "2025-01-06T12:00:00.000Z",
    }),
    UserChats: z.array(z.any()).openapi({
      description: "List of associated user-chat relationships",
      example: [],
    }),
    ChatGroup: z.any().nullable().optional().openapi({
      description: "The associated group chat, if any",
      example: null,
    }),
    Messages: z.array(z.any()).openapi({
      description: "List of messages associated with the chat",
      example: [],
    }),
    User: z.any().nullable().optional().openapi({
      description: "The associated user, if any",
      example: null,
    }),
  })
  .openapi({
    description: "Schema for a Chat entity",
    example: {
      chat_id: 1,
      group_id: null,
      sent_by: 10,
      message: "Hello, world!",
      chat_type: "PRIVATE",
      createdAt: "2025-01-01T12:00:00.000Z",
      updatedAt: "2025-01-06T12:00:00.000Z",
      UserChats: [],
      ChatGroup: null,
      Messages: [],
      User: null,
    },
  });

export { ChatSchema };
