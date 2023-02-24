export interface UserProfile extends UserRegister {
  aboutMe: string;
  relationships: {
    friends: RelationshipsStructure;
    enemies: RelationshipsStructure;
  };
}
export interface UserRegister extends UserCredentials {
  email: string;
  avatar: string;
}
export interface UserCredentials {
  username: string;
  password: string;
}

type RelationshipsStructure = UserProfile[];
