package com.practice.reddit.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.practice.reddit.exceptions.DemoException;
import com.practice.reddit.exceptions.PostNotFoundException;
import com.practice.reddit.exceptions.RedditException;
import com.practice.reddit.exceptions.SubredditNotFoundException;

@ControllerAdvice
public class ExceptionControllerAdvice {
	
	@ExceptionHandler(DemoException.class)
	public void handleException(DemoException e, HttpServletResponse response) throws IOException {
		response.resetBuffer();
		response.setStatus(e.getCode());
		response.getOutputStream()
		.print("{\"error\": \"" + validate(e.getError()) + "\", \"detail\": \""
				+ validate(e.getMessage()) + "\", \"instance\": \""
				+  "\"}");
		response.flushBuffer();
		
	}
	
	@ExceptionHandler(RedditException.class)
	public void handleException(RedditException e, HttpServletResponse response) throws IOException {
		response.resetBuffer();
		response.setStatus(e.getCode());
		response.getOutputStream()
		.print("{\"error\": \"" + validate(e.getError()) + "\", \"detail\": \""
				+ validate(e.getMessage()) + "\", \"instance\": \""
				+  "\"}");
		response.flushBuffer();
		
	}
	
	@ExceptionHandler(PostNotFoundException.class)
	public void handleException(PostNotFoundException e, HttpServletResponse response) throws IOException {
		response.resetBuffer();
		response.setStatus(e.getCode());
		response.getOutputStream()
		.print("{\"error\": \"" + validate(e.getError()) + "\", \"detail\": \""
				+ validate(e.getMessage()) + "\", \"instance\": \""
				+  "\"}");
		response.flushBuffer();
		
	}
	
	@ExceptionHandler(SubredditNotFoundException.class)
	public void handleException(SubredditNotFoundException e, HttpServletResponse response) throws IOException {
		response.resetBuffer();
		response.setStatus(e.getCode());
		response.getOutputStream()
		.print("{\"error\": \"" + validate(e.getError()) + "\", \"detail\": \""
				+ validate(e.getMessage()) + "\", \"instance\": \""
				+  "\"}");
		response.flushBuffer();
		
	}
	
	
	@ExceptionHandler(UsernameNotFoundException.class)
	public void handleException(UsernameNotFoundException e, HttpServletResponse response) throws IOException {
		response.resetBuffer();
		response.setStatus(HttpStatus.NOT_FOUND.value());
		response.getOutputStream()
		.print("{\"error\": \"" + "No such user found." + "\", \"detail\": \""
				+ validate(e.getMessage()) + "\", \"instance\": \""
				+  "\"}");
		response.flushBuffer();
		
	}
	
	public String validate(String str) {
		return str == null ? "" : str;
	}

}
