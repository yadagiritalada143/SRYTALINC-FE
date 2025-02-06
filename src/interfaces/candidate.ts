export interface PoolCandidatesComments {
  userId: {
    firstName: string;
    lastName: string;
    id: string;
  };
  callStartsAt: Date;
  callEndsAt: Date;
  comment: string;
  updateAt: string;
  id: string;
}
