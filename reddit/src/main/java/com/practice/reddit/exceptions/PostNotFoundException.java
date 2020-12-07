package com.practice.reddit.exceptions;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class PostNotFoundException extends RuntimeException {
    
	private static final long serialVersionUID = 1L;

	private int code;
	
	private String error;
	
	public PostNotFoundException(String message) {
    	super(message);
    }
	
	public PostNotFoundException(final HttpStatus status, final String message) {
		super(message);
		this.code = status.value();
		this.error = message;
	}
    
}
