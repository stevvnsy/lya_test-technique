package com.testtech.backend.exception;

import com.testtech.backend.domain.exception.category.CategoryNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        logValidationErrors(ex);

        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", "Validation échouée pour un ou plusieurs champs.");
        body.put("errors", fieldErrors);

        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAllExceptions(Exception ex) {
        HttpStatus status = determineHttpStatus(ex);
        logException(ex, status);
        Map<String, Object> body = createErrorBody(status, ex.getMessage());

        return new ResponseEntity<>(body, status);
    }

    private HttpStatus determineHttpStatus(Exception ex) {
        if (ex instanceof CategoryNotFoundException) {
            return HttpStatus.NOT_FOUND;
        } else if (ex instanceof IllegalArgumentException) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    private Map<String, Object> createErrorBody(HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message != null ? message : "Une erreur inattendue s'est produite");
        return body;
    }

    private void logException(Exception ex, HttpStatus status) {
        if (status.is4xxClientError()) {
            logger.warn("Erreur client : {} - {}", status.value(), ex.getMessage());
        } else if (status.is5xxServerError()) {
            logger.error("Erreur serveur : {} - {}", status.value(), ex.getMessage());
        }
    }

    private void logValidationErrors(MethodArgumentNotValidException ex) {
        ex.getBindingResult().getFieldErrors().forEach(error ->
                logger.warn("Validation échouée sur le champ '{}': {}", error.getField(), error.getDefaultMessage())
        );
    }
}