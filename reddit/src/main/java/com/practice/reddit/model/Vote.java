package com.practice.reddit.model;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vote {
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long voteId;
	
	private VoteType voteType;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "postId", referencedColumnName = "postId")
	private Post post;
	
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "userId", referencedColumnName = "userId")
	private User user;
	
}
