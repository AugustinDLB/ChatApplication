package com.example.demo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class SimpleController {

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        String userName = body.get("userName");
        
        if ("Augustin".equals(userName)) {
        Map<String, Object> response = Map.of(
            "usersList", List.of("Clement", "Benedicte", "Philippe", "Manon", "Levan")
            
        );
        return ResponseEntity.ok(response);
        } else {
            Map<String, Object> error = Map.of("message", "Unknown user");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
    }
        @RequestMapping("")
        public String home() {
            return "Greetings from Spring Boot!";
        }

        @GetMapping("/")
        public String home2() {
            return "Greetings from Spring Boot!";
        }
}