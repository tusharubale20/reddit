package com.practice.reddit.mapper;

import java.time.Instant;

import org.springframework.stereotype.Component;

import com.github.marlonlom.utilities.timeago.TimeAgo;
import com.practice.reddit.dto.CommentsDto;
import com.practice.reddit.model.Comment;
import com.practice.reddit.model.Comment.CommentBuilder;
import com.practice.reddit.model.Post;
import com.practice.reddit.model.User;

@Component
public class CommentMapper {

	public Comment map(CommentsDto commentsDto, Post post, User currentUser) {
		if(commentsDto == null || post == null || currentUser == null) {
			return null;
		}
		
		CommentBuilder comment = Comment.builder();
		comment.id(commentsDto.getId());
		comment.text(commentsDto.getText());
		comment.post(post);
		comment.createdDate(Instant.now());
		comment.user(currentUser);
		
		return comment.build();
	}
	
	public CommentsDto mapToDto(Comment comment) {
		if(comment == null) {
			return null;
		}
		
		CommentsDto commentsDto = new CommentsDto();
		
		commentsDto.setId(comment.getId());
		commentsDto.setText(comment.getText());
		commentsDto.setPostId(comment.getPost().getPostId());
		commentsDto.setUserName(comment.getUser().getUsername());
		commentsDto.setDuration(TimeAgo.using(comment.getCreatedDate().toEpochMilli()));
		
		return commentsDto;
	}
}
