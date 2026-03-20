export interface CrmPushRequest {
  title?: string;
  subtitle?: string;
  body: string;
  userIds?: Array<number>;
  stylistIds?: Array<number>;
  allUsers?: boolean;
  allStylists?: boolean;
}
