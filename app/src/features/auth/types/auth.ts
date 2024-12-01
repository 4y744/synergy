export type Auth = {
  uid: string;
  username: string;
  created: Date;
  email: string;
  signedIn: boolean;
} | null;
