package fr.augustin

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Database
import java.sql.Connection
import java.sql.DriverManager

@Serializable
data class RegisterRequest(
    val name: String, val password: String
)

@Serializable
data class LoginResponse(
    val user: ExposedUser, val conversations: List<ExposedConversation>, val usersList: List<ExposedUser>
)

@Serializable
data class CreateConversationRequest(
    val name: String, val members: List<Int>
)

@Serializable
data class MessagePostRequest(
    val conversationId: Int, val sender: Int, val content: String
)


fun Application.configureDatabases() {

    val dbConnection: Connection = connectToPostgres(embedded = true)

    val database = Database.connect(
//        url = "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1",
        url = "jdbc:h2:file:./data/test;AUTO_SERVER=TRUE",
        user = "root",
        driver = "org.h2.Driver",
        password = "",
    )

    val userService = UserService(database)
    val conversationService = ConversationService(database)
    routing {
        // Create user
        post("/users/register") {
            val user = call.receive<RegisterRequest>()
            if (userService.read(user.name) == null) {
                val id = userService.create(user.name, user.password)
                call.respond(HttpStatusCode.Created, id)
            } else {
                call.respond(HttpStatusCode.Conflict)
            }
        }

        post("/users/login") {
            val user = call.receive<RegisterRequest>()
            val result: ExposedUser? = userService.read(user.name, user.password);
            if (result == null) {
                call.respond(HttpStatusCode.Unauthorized);
            } else {
                val conversations = conversationService.getConversationsOfUser(result.id)
                val usersList = userService.getUsersList()
                val response = LoginResponse(ExposedUser(result.id, result.name), conversations, usersList);
                call.respond(HttpStatusCode.OK, response)
            }
        }

        post("/users/logout") {
            call.respond(HttpStatusCode.OK)
        }

        // Delete user
        delete("/users/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            userService.delete(id)
            call.respond(HttpStatusCode.OK)
        }

        post("/conversations/register/") {
            val request = call.receive<CreateConversationRequest>()
            val conversationId = conversationService.create(request.members, request.name)
            val response = conversationService.getConversation(conversationId)
            call.respond(HttpStatusCode.OK, response)
        }

        post("/conversations/send/") {
            val request = call.receive<MessagePostRequest>()
            val message = conversationService.addMessage(request.conversationId, request.sender, request.content)
            call.respond(HttpStatusCode.OK, message)
        }
    }
}

/**
 * Makes a connection to a Postgres database.
 *
 * In order to connect to your running Postgres process,
 * please specify the following parameters in your configuration file:
 * - postgres.url -- Url of your running database process.
 * - postgres.user -- Username for database connection
 * - postgres.password -- Password for database connection
 *
 * If you don't have a database process running yet, you may need to [download]((https://www.postgresql.org/download/))
 * and install Postgres and follow the instructions [here](https://postgresapp.com/).
 * Then, you would be able to edit your url,  which is usually "jdbc:postgresql://host:port/database", as well as
 * user and password values.
 *
 *
 * @param embedded -- if [true] defaults to an embedded database for tests that runs locally in the same process.
 * In this case you don't have to provide any parameters in configuration file, and you don't have to run a process.
 *
 * @return [Connection] that represent connection to the database. Please, don't forget to close this connection when
 * your application shuts down by calling [Connection.close]
 * */
fun Application.connectToPostgres(embedded: Boolean): Connection {
    Class.forName("org.postgresql.Driver")
    if (embedded) {
        log.info("Using embedded H2 database for testing; replace this flag to use postgres")
        return DriverManager.getConnection("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", "root", "")
    } else {
        val url = environment.config.property("postgres.url").getString()
        log.info("Connecting to postgres database at $url")
        val user = environment.config.property("postgres.user").getString()
        val password = environment.config.property("postgres.password").getString()

        return DriverManager.getConnection(url, user, password)
    }
}
