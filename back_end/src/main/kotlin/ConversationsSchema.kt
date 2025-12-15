package fr.augustin

import kotlinx.coroutines.Dispatchers
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

@Serializable
data class ExposedMessage(val id: Int, val sender: Int, val content: String, val time: Long)

@Serializable
data class ExposedConversation(
    val id: Int, val members: List<Int>, val name: String?, val messages: List<ExposedMessage>
)

class ConversationService(database: Database) {

    object Conversations : Table() {
        val id = integer("id").autoIncrement()
        val name = varchar(name = "name", length = 50)

        override val primaryKey = PrimaryKey(id)
    }

    object Messages : Table() {
        val id = integer("id").autoIncrement()
        val conversation_id = integer("conversation_id")
        val sender = integer("sender")
        val content = varchar(name = "content", length = 50)
        val time = long(name = "time")

        override val primaryKey = PrimaryKey(id)
    }

    object ConversationMembers : Table() {
        val id = integer("id").autoIncrement()
        val conversation_id = integer("conversation_id")
        val user_id = integer("user_id")

        override val primaryKey = PrimaryKey(id)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Conversations)
            SchemaUtils.create(Messages)
            SchemaUtils.create(ConversationMembers)
        }
    }

    suspend fun create(inputMembers: List<Int>, inputName: String): Int = dbQuery {

        // add conversation to the conversations object
        val conversationId = Conversations.insert {
            it[name] = inputName
        } get Conversations.id

        // add members to
        for (memberId in inputMembers) {
            ConversationMembers.insert {
                it[conversation_id] = conversationId
                it[user_id] = memberId
            }
        }
        conversationId
    }

    suspend fun addMessage(conversationId: Int, inputSender: Int, inputContent: String, inputTime: Long) = dbQuery {
        Messages.insert {
            it[conversation_id] = conversationId
            it[sender] = inputSender
            it[content] = inputContent
            it[time] = inputTime
        }
    }

    suspend fun addMember(conversationId: Int, userId: Int) {
        dbQuery {
            ConversationMembers.insert {
                it[conversation_id] = conversationId
                it[user_id] = userId
            }
        }
    }

    suspend fun removeMember(conversationId: Int, userId: Int) {
        dbQuery {
            ConversationMembers.deleteWhere {
                (ConversationMembers.conversation_id eq conversationId) and (ConversationMembers.user_id eq userId)
            }
        }
    }

    suspend fun getConversationMessages(convId: Int): List<ExposedMessage> {
        return dbQuery {
            Messages
                .selectAll()
                .where { Messages.conversation_id eq convId }
                .map {
                    ExposedMessage(
                        it[Messages.id],
                        it[Messages.sender],
                        it[Messages.content],
                        it[Messages.time]
                    )
                }
        }
    }

    suspend fun getConversationMembers(conversationId: Int): List<Int> {
        return dbQuery {
            ConversationMembers.selectAll()
                .where(ConversationMembers.conversation_id eq conversationId)
                .map { it[ConversationMembers.user_id] }
        }
    }

    suspend fun getConversationsIdsOfUser(memberId: Int): List<Int> {
        return dbQuery {
            ConversationMembers
                .selectAll()
                .where { ConversationMembers.user_id eq memberId }
                .map { it[ConversationMembers.conversation_id] }
        }
    }

    suspend fun getConversationName(conversationId: Int): String? {
        return dbQuery {
            Conversations
                .selectAll()
                .where { Conversations.id eq conversationId }
                .singleOrNull()
                ?.get(Conversations.name)
        }
    }

    suspend fun getConversationsOfUser(userId: Int): List<ExposedConversation> {
        val conversationsIds = getConversationsIdsOfUser(userId)
        return conversationsIds.map { conversationId ->
            val conversationMembers = getConversationMembers(conversationId)
            val conversationMessages = getConversationMessages(conversationId)
            val conversationName = getConversationName(conversationId)

            ExposedConversation(
                id = conversationId,
                members = conversationMembers,
                name = conversationName,
                messages = conversationMessages
            )
        }
    }

    suspend fun getConversation(conversationId: Int): ExposedConversation {
        val messages = getConversationMessages(conversationId)
        val members = getConversationMembers(conversationId)
        val name = getConversationName(conversationId)

        return ExposedConversation(conversationId, members, name, messages)
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T = newSuspendedTransaction(Dispatchers.IO) { block() }
}

