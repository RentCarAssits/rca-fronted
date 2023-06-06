import {Profile} from "./profile";

export interface RegisterUser {
  userName: string;
  email:    string;
  password: string;
  roles:    string[];
  profile:  Profile;
}
