package fr.augustin

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Database

@Serializable
data class Message(val from: String, val to: String, val content: String)

class MessageService(database: Database) {
}

export interface Message {
    id:       number;
    sender:   number;
    content:  string;
    time:     Date;
}