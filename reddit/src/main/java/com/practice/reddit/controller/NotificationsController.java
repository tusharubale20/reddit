package com.practice.reddit.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@AllArgsConstructor
public class NotificationsController {

	@PostMapping
	public void addPushSubscriber(Object obj) {
		System.out.println(obj);
	}
	
	@PostMapping("/newsletter")
	public void notifications(Object obj) {
		System.out.println(obj);
	}
	
	
}
