import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.Table
import kotlin.time.Instant

@OptIn(kotlin.time.ExperimentalTime::class)
@Serializable
data class Message(val id: Int, val sender: Int, val content: String, val time: Instant)

class MessageService(database: Database) {
    object Messages : Table() {
        val id = integer("id").autoIncrement()
        val sender = integer("id")
        val content = varchar(name = "content", length = 50)
    }
}