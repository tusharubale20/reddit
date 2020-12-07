package com.practice.reddit.exceptions;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class RedditException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int code;
	
	private String error;

    public RedditException(String exMessage) {
        super(exMessage);
    }
    
    public RedditException(String exMessage, Exception exception) {
        super(exMessage, exception);
    }
    
    public RedditException(final HttpStatus status, final String message) {
		super(message);
		this.code = status.value();
		this.error = message;
	}
}
