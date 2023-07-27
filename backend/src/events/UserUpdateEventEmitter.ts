import EventEmitter from "events";
import { UpdateEventData, EventRepository } from "../repository/EventRepository";
import path from 'path'
import { env } from "../config/env";
import { PubSub } from "@google-cloud/pubsub";

export class UserUpdateEventEmitter {
  private eventEmitter: EventEmitter;
  private readonly EVENT_NAME = "user-update";
  private eventRepository: EventRepository;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.eventRepository = new EventRepository();
    //TODO: setup things for GCP Pub/Sub

    const secret_key_filepath = path.join(__dirname, '..', '..', 'secrets', env.GCP_SECRET_FILE!!);
    const projectId = env.GCP_PROJECT_ID;
    const topicName = env.GCP_PUBSUB_UPDATE_TOPIC!!;

    // Creates a client with the specified credentials as a string.
  const pubSubClient = new PubSub({ projectId: projectId, keyFilename: secret_key_filepath});

  // Get a reference to the topic.
  const topic = pubSubClient.topic(topicName);

  const data = JSON.stringify({ key: 'value' });

    
    this.eventEmitter.on(
      this.EVENT_NAME,
      async (updateData: UpdateEventData) => {
        try {
          console.log("Update event fired", updateData);
          // await this.eventRepository.saveEvent(updateData);
        
          const messageId = await topic.publishMessage({json:updateData});
          // Publish the message.
          console.log(`Message ${messageId} published.`);
        } catch(err) {
          console.log(err);
        }
      }
    );
  }

  emit(data: UpdateEventData) {
    this.eventEmitter.emit(this.EVENT_NAME, data);
    // TODO: send to pub sub?
  }
}

export const userUpdateEventEmitter = new UserUpdateEventEmitter();
