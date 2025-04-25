import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { asyncContext, CONTEXT_KEYS } from "../common/async-context";

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<any>) {
    const userId = asyncContext.get(CONTEXT_KEYS.USER_ID);
    if (userId && event.entity) {
      event.entity.createdBy = userId;
      event.entity.updatedBy = userId;
    }
  }

  beforeUpdate(event: UpdateEvent<any>) {
    const userId = asyncContext.get(CONTEXT_KEYS.USER_ID);
    if (userId && event.entity) {
      event.entity.updatedBy = userId;
    }
  }
}
