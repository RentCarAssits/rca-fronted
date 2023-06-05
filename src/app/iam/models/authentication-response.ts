import {User} from "./user";
import {Profile} from "./profile";
import {Account} from "./account";

export interface AuthenticationResponse {
  user: User;
  profile: Profile;
  account: Account;
  token: string;

}
