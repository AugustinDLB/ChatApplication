package fr.augustin

import fr.augustin.MessageService.Messages
import kotlinx.coroutines.Dispatchers
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.timestamp
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

@OptIn(kotlin.time.ExperimentalTime::class)
@Serializable
data class ExposedMessage(val id: Int, val sender: Int, val content: String, val time: Long)

@OptIn(kotlin.time.ExperimentalTime::class)
class MessageService(database: Database) {
    object Messages : IntIdTable() {
        val conversation_id = reference("conversation_id", ConversationService.Conversations)
        val sender = integer("sender")
        val content = varchar(name = "content", length = 50)
        val time = timestamp(name = "time")
    }

    init {
        transaction(database) {
            SchemaUtils.create(Messages)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}

@Serializable
data class ExposedConversation(val id: Int, val members: List<Int>, val name: String)

class ConversationService(database: Database) {
    object Conversations : IntIdTable() {
        val name = varchar(name = "name", length = 50)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Conversations)
        }
    }
    suspend fun create(members: List<Int>, name: String): Int = dbQuery {
        Conversations.insert {
            it[name] = name
        } [Conversations.id].value
    }

    suspend fun getMessagesOfConv(convId: Int): List<ExposedMessage>{
        return dbQuery {
            Messages.selectAll()
                .where { Messages.conversation_id eq convId }
                .map{ ExposedMessage(it[Messages.id].value, it[Messages.sender], it[Messages.content], it[Messages.time].toEpochMilli())}
                .toList()
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}

