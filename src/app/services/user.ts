export interface User {

  /** The user's unique ID */
  moderatorId:string;
  id:string;
  name:UserName;
  displayName:string;
  email:string;
  emails?:UserEmail[];
  photos?:UserPhoto[];
  provider?:string;
  config?:any;
}

interface UserEmail {
  value:string;
  verified:boolean;
}

interface UserName {
  familyName:string;
  givenName:string;
}

interface UserPhoto {
  value:string;
}

export interface UserPreferences {
  language:string;
  lastClientId?:number;
}