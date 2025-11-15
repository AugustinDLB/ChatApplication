export interface Message {
  id:       number;
  sender:   number;
  content:  string;
  time:     Date;
}

export interface MessageList {
    [ key: number ]: Message;
}