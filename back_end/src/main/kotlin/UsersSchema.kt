package fr.augustin

import kotlinx.coroutines.Dispatchers
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

@Serializable
data class ExposedUser(val id: Int, val name: String)

class UserService(database: Database) {
    object Users : IntIdTable() {
        val name = varchar("name", length = 50)
        val password = varchar("password", length = 50)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Users)
        }
    }

    suspend fun create(userName: String, userPassword: String): Int = dbQuery {
        Users.insert {
            it[name] = userName
            it[password] = userPassword
        }[Users.id].value
    }

//    suspend fun read(id: Int): ExposedUser? {
//
//
//        return dbQuery {
//            Users.selectAll()
//                .where { Users.id eq id }
//                .map { ExposedUser(it[Users.id].value, it[Users.name]) }
//                .singleOrNull()
//        }
//    }

    suspend fun read(userName: String, userPassword: String): ExposedUser? = dbQuery {
        Users
            .selectAll()
            .where { (Users.name eq userName) and (Users.password eq userPassword) }
            .map { ExposedUser( it[Users.id].value, it[Users.name]) }
            .singleOrNull()
    }

    suspend fun read(name: String): Int? {
        return dbQuery {
            Users.selectAll()
                .where { Users.name eq name }
                .singleOrNull()
                ?.get(Users.id)
                ?.value
        }
    }

    suspend fun update(id: Int, user: ExposedUser) {
        dbQuery {
            Users.update({ Users.id eq id }) {
                it[name] = user.name
            }
        }
    }

    suspend fun delete(id: Int) {
        dbQuery {
            Users.deleteWhere { Users.id.eq(id) }
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}

